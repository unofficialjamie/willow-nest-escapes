-- Enable storage for website images with proper RLS policies
-- Drop existing policies if any
DROP POLICY IF EXISTS "Public read access for website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Create RLS policies for website-images bucket
CREATE POLICY "Public read access for website images"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'website-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'website-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'website-images' 
  AND auth.role() = 'authenticated'
);