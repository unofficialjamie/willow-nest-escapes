-- Fix RLS for user_roles only

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

-- Add missing columns to rooms table if they don't exist
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS price numeric;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS amenities jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS button_text text DEFAULT 'Book Now';