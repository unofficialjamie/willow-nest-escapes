-- Create website-images storage bucket if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'website-images') THEN
    INSERT INTO storage.buckets (id, name)
    VALUES ('website-images', 'website-images');
  END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete website images" ON storage.objects;

-- Create RLS policies for website-images bucket
-- Allow public to view images
CREATE POLICY "Public can view website images"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-images');

-- Allow authenticated users (admins) to upload images
CREATE POLICY "Authenticated users can upload website images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users (admins) to update images
CREATE POLICY "Authenticated users can update website images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users (admins) to delete images
CREATE POLICY "Authenticated users can delete website images"
ON storage.objects FOR DELETE
USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');