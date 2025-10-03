-- Fix RLS for user_roles and add missing columns

-- Create security definer function for role assignment
CREATE OR REPLACE FUNCTION public.assign_user_role(
  _user_id uuid,
  _role app_role
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if this is the first user (allow first admin)
  IF NOT EXISTS (SELECT 1 FROM public.user_roles) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, _role);
  ELSIF _role = 'admin' THEN
    -- Only existing admins can create new admins
    IF public.has_role(auth.uid(), 'admin') THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (_user_id, _role)
      ON CONFLICT (user_id, role) DO NOTHING;
    ELSE
      RAISE EXCEPTION 'Only admins can assign admin role';
    END IF;
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, _role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Drop existing RLS policies on user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Create new RLS policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add missing columns to rooms table
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS price numeric;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS amenities jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS button_text text DEFAULT 'Book Now';

-- Seed page_content data
INSERT INTO public.page_content (page_name, section_key, content_type, content_value, display_order) VALUES
('home', 'hero_heading', 'text', 'Welcome to Signature Hotels', 1),
('home', 'hero_text', 'text', 'Experience luxury and comfort across Nigeria', 2),
('home', 'hero_image', 'image', '/src/assets/hero-luxury-hotel.jpg', 3),
('about', 'hero_heading', 'text', 'About Signature Hotels', 1),
('about', 'hero_text', 'text', 'Your trusted hospitality partner in Nigeria', 2),
('contact', 'hero_heading', 'text', 'Get In Touch', 1),
('contact', 'hero_text', 'text', 'We are here to assist you 24/7', 2),
('facilities', 'hero_heading', 'text', 'World-Class Facilities', 1),
('facilities', 'hero_text', 'text', 'Experience comfort and luxury at every turn', 2);

-- Seed rooms data
INSERT INTO public.rooms (name, location, description, image_url, size, occupancy, price, amenities, button_text, button_link, display_order, is_active) VALUES
('Presidential Suite', 'abuja', 'Luxurious presidential suite with panoramic city views', '/src/assets/rooms/presidential-suite.jpg', '120 sqm', '4', 350000, '["King Bed", "Jacuzzi", "Living Area", "Mini Bar", "Smart TV"]'::jsonb, 'Book Now', '/contact', 1, true),
('Executive Suite', 'abuja', 'Spacious executive suite perfect for business travelers', '/src/assets/rooms/executive-suite.jpg', '80 sqm', '3', 250000, '["King Bed", "Work Desk", "Mini Bar", "Smart TV"]'::jsonb, 'Book Now', '/contact', 2, true),
('Deluxe King Room', 'abuja', 'Elegant room with king-size bed and modern amenities', '/src/assets/rooms/deluxe-king.jpg', '45 sqm', '2', 150000, '["King Bed", "Mini Bar", "Smart TV", "Safe"]'::jsonb, 'Book Now', '/contact', 3, true),
('Premium Queen Room', 'ibadan', 'Comfortable room with queen bed and garden view', '/src/assets/rooms/premium-queen.jpg', '40 sqm', '2', 120000, '["Queen Bed", "Garden View", "Mini Bar", "Smart TV"]'::jsonb, 'Book Now', '/contact', 1, true),
('Superior Twin Room', 'ibadan', 'Perfect for friends or colleagues traveling together', '/src/assets/rooms/superior-twin.jpg', '42 sqm', '2', 130000, '["Twin Beds", "Work Desk", "Mini Bar", "Smart TV"]'::jsonb, 'Book Now', '/contact', 2, true),
('Business King Room', 'ogbomosho', 'Ideal for business travelers with work amenities', '/src/assets/rooms/business-king.jpg', '38 sqm', '2', 100000, '["King Bed", "Work Desk", "Mini Bar", "Smart TV"]'::jsonb, 'Book Now', '/contact', 1, true),
('Standard Double Room', 'ogbomosho', 'Comfortable double room with essential amenities', '/src/assets/rooms/standard-double.jpg', '35 sqm', '2', 85000, '["Double Bed", "Mini Bar", "TV"]'::jsonb, 'Book Now', '/contact', 2, true),
('Family Room', 'ogbomosho', 'Spacious room perfect for families', '/src/assets/rooms/family-room.jpg', '50 sqm', '4', 140000, '["King Bed", "Sofa Bed", "Mini Bar", "Smart TV"]'::jsonb, 'Book Now', '/contact', 3, true);