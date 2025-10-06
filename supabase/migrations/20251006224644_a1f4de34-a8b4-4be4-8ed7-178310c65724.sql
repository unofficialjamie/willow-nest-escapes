-- Clean up old policies and recreate storage bucket properly
DO $$ 
BEGIN
  -- Drop all existing policies for website-images bucket
  DROP POLICY IF EXISTS "Public Access" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
  DROP POLICY IF EXISTS "Public can view website images" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access for website images" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can upload website images" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can update website images" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can delete website images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload website images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update website images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete website images" ON storage.objects;
END $$;

-- Recreate the bucket
DELETE FROM storage.buckets WHERE id = 'website-images';
INSERT INTO storage.buckets (id, name) VALUES ('website-images', 'website-images');

-- Create clean, simple policies
CREATE POLICY "website_images_public_read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-images');

CREATE POLICY "website_images_auth_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-images');

CREATE POLICY "website_images_auth_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'website-images');

CREATE POLICY "website_images_auth_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-images');