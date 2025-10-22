// Script to extract base64 images from Supabase and save them locally
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function saveBase64Image(base64String, filename) {
  // Extract the base64 data (remove data:image/...;base64, prefix)
  const matches = base64String.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) {
    console.error(`Invalid base64 string for ${filename}`);
    return null;
  }

  const extension = matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, 'base64');
  
  const filepath = path.join(imagesDir, `${filename}.${extension}`);
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Saved: ${filepath}`);
  
  return `/images/${filename}.${extension}`;
}

async function extractImages() {
  console.log('Extracting images from database...\n');

  // Get site settings images
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .or('setting_type.eq.image,setting_value.like.%data:image%');

  if (settings) {
    settings.forEach(setting => {
      if (setting.setting_value && setting.setting_value.startsWith('data:image')) {
        const newPath = saveBase64Image(setting.setting_value, setting.setting_key);
        if (newPath) {
          console.log(`  Update ${setting.setting_key} to: ${newPath}`);
        }
      }
    });
  }

  // Get page sections with images
  const { data: sections } = await supabase
    .from('page_sections')
    .select('*');

  if (sections) {
    sections.forEach(section => {
      const data = section.data;
      
      // Check for images in data object
      if (data) {
        // Hero images
        if (data.image && typeof data.image === 'string' && data.image.startsWith('data:image')) {
          const filename = `${section.page_name}-${section.section_key}-hero`;
          const newPath = saveBase64Image(data.image, filename);
          console.log(`  Update ${section.page_name}/${section.section_key} image to: ${newPath}`);
        }

        // Items with images
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach((item, idx) => {
            if (item.image && typeof item.image === 'string' && item.image.startsWith('data:image')) {
              const filename = `${section.page_name}-${section.section_key}-item${idx}`;
              const newPath = saveBase64Image(item.image, filename);
              console.log(`  Update ${section.page_name}/${section.section_key}/item[${idx}] to: ${newPath}`);
            }
          });
        }

        // Gallery images
        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img, idx) => {
            if (typeof img === 'string' && img.startsWith('data:image')) {
              const filename = `${section.page_name}-${section.section_key}-gallery${idx}`;
              const newPath = saveBase64Image(img, filename);
              console.log(`  Update ${section.page_name}/${section.section_key}/gallery[${idx}] to: ${newPath}`);
            }
          });
        }
      }
    });
  }

  console.log('\n✅ Image extraction complete!');
  console.log('\nNext steps:');
  console.log('1. Review the extracted images in public/images/');
  console.log('2. Update the database to reference these local paths instead of base64');
}

extractImages().catch(console.error);
