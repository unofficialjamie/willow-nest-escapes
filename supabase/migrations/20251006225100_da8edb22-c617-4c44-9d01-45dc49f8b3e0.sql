-- Remove the problematic bucket and recreate it properly
DELETE FROM storage.buckets WHERE id = 'website-images';

-- Create the bucket with all necessary configuration
INSERT INTO storage.buckets (id, name, owner, created_at, updated_at)
VALUES (
  'website-images',
  'website-images',
  NULL,
  now(),
  now()
);