-- Remove the broken storage bucket completely
DELETE FROM storage.buckets WHERE id = 'website-images';

-- We'll use base64 encoding in the database instead of storage
-- No storage bucket needed