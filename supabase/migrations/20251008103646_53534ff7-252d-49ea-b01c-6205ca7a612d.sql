-- Create RLS policies for website-images bucket
-- Allow public read access to website images
CREATE POLICY "Public read access for website images"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-images');

-- Allow authenticated users to upload to website-images bucket
CREATE POLICY "Authenticated users can upload website images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update website images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'website-images');

-- Allow authenticated users to delete website images
CREATE POLICY "Authenticated users can delete website images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-images');