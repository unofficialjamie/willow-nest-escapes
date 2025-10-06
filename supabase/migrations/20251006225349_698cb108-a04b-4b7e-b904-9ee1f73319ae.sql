-- Properly configure the storage bucket with all required settings
DELETE FROM storage.buckets WHERE id = 'website-images';

-- Insert bucket with proper configuration
INSERT INTO storage.buckets (
  id,
  name,
  owner,
  created_at,
  updated_at
) VALUES (
  'website-images',
  'website-images',
  NULL,
  now(),
  now()
);

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "website_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "website_images_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "website_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "website_images_auth_delete" ON storage.objects;

-- Create new policies for authenticated users (admins)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-images');

CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'website-images');

CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'website-images');

CREATE POLICY "Allow public access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'website-images');