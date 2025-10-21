-- Create storage bucket for website images (if it doesn't exist)
INSERT INTO storage.buckets (id, name)
VALUES ('website-images', 'website-images')
ON CONFLICT (id) DO NOTHING;