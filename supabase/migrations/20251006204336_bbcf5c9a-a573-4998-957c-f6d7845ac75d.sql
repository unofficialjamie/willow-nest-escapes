-- Create website-images storage bucket
INSERT INTO storage.buckets (id, name)
VALUES ('website-images', 'website-images')
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete website images" ON storage.objects;

-- Create RLS policies for website-images bucket
CREATE POLICY "Public can view website images"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-images');

CREATE POLICY "Authenticated users can upload website images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'website-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update website images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete website images"
ON storage.objects FOR DELETE
USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');