-- Create storage bucket for website images (without public column)
INSERT INTO storage.buckets (id, name) 
VALUES ('website-images', 'website-images')
ON CONFLICT (id) DO NOTHING;

-- Storage policies for website images
CREATE POLICY "Public can view website images"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-images');

CREATE POLICY "Admins can upload website images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'website-images' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update website images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'website-images' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete website images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'website-images' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- RLS policies for page_content table
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view page content"
ON page_content FOR SELECT
USING (true);

CREATE POLICY "Admins can insert page content"
ON page_content FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update page content"
ON page_content FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete page content"
ON page_content FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- RLS policies for rooms table
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active rooms"
ON rooms FOR SELECT
USING (is_active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert rooms"
ON rooms FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update rooms"
ON rooms FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete rooms"
ON rooms FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- RLS policies for site_settings table
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view site settings"
ON site_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can update site settings"
ON site_settings FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);