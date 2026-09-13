-- ==============================================================================
-- Soreti Homes (የቤት ሸያጭ ብቻ) - Supabase Database Schema
-- Run this script in the Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run (Ctrl+Enter / Cmd+Enter)
-- ==============================================================================

-- 1. Create Listings Table
CREATE TABLE IF NOT EXISTS public.listings (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,           -- 'house' | 'car'
  type TEXT,                        -- 'Villa', 'Apartment', 'SUV', 'Luxury Sedan', etc.
  title TEXT NOT NULL,
  location TEXT,
  server TEXT,                      -- Region / Sub-city (e.g., 'Bole & Atlas', 'Kazanchis & Kirkos')
  price NUMERIC NOT NULL DEFAULT 0,
  rent_price NUMERIC,
  status TEXT DEFAULT 'For Sale',   -- 'For Sale' | 'For Rent'
  badge TEXT,                       -- 'Featured' | 'Verified' | 'Hot'
  featured BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 5.0,
  seller JSONB DEFAULT '{}'::jsonb, -- { name, role, phone, verified }
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  specs JSONB DEFAULT '{}'::jsonb,  -- { beds, baths, sqft, mileage, transmission, etc. }
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES public.listings(id) ON DELETE SET NULL,
  asset_title TEXT,
  asset_category TEXT,
  asset_price NUMERIC,
  asset_image TEXT,
  asset_location TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  inspection_date TEXT,
  inspection_time TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Pending',    -- 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Indexes for High Performance Queries
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_price ON public.listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON public.listings(featured);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 5. Server-managed admin authorization
-- Do not use raw_user_meta_data for authorization: users can edit it.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Migrate the administrator created by the old client-side setup form once.
-- This copies only the old setup marker into server-managed app metadata.
-- Remove this UPDATE after the first migration run if the script is reused.
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
WHERE raw_user_meta_data ->> 'role' = 'admin'
  AND COALESCE(raw_app_meta_data ->> 'role', '') <> 'admin';

-- 6. Set RLS Security Policies
-- ------------------------------------------------------------------------------
-- A. LISTINGS POLICIES:
-- Anyone (visitors and customers) can view properties and vehicles
DROP POLICY IF EXISTS "Public Read Listings" ON public.listings;
CREATE POLICY "Public Read Listings"
  ON public.listings FOR SELECT
  USING (true);

-- Only authenticated admins can add new listings
DROP POLICY IF EXISTS "Public Insert Listings" ON public.listings;
DROP POLICY IF EXISTS "Admin Insert Listings" ON public.listings;
CREATE POLICY "Admin Insert Listings"
  ON public.listings FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Only authenticated admins can update listings
DROP POLICY IF EXISTS "Public Update Listings" ON public.listings;
DROP POLICY IF EXISTS "Admin Update Listings" ON public.listings;
CREATE POLICY "Admin Update Listings"
  ON public.listings FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only authenticated admins can delete listings
DROP POLICY IF EXISTS "Public Delete Listings" ON public.listings;
DROP POLICY IF EXISTS "Admin Delete Listings" ON public.listings;
CREATE POLICY "Admin Delete Listings"
  ON public.listings FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- B. BOOKINGS POLICIES (Customer Privacy & Admin Management):
-- Public customers can submit inspection booking requests
DROP POLICY IF EXISTS "Public Insert Bookings" ON public.bookings;
CREATE POLICY "Public Insert Bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (
    status = 'Pending'
    AND char_length(trim(customer_name)) BETWEEN 1 AND 120
    AND char_length(trim(customer_phone)) BETWEEN 3 AND 40
    AND char_length(coalesce(notes, '')) <= 2000
  );

-- Only authenticated admins can inspect customer bookings (phone numbers, private notes)
DROP POLICY IF EXISTS "Public Read Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin Read Bookings" ON public.bookings;
CREATE POLICY "Admin Read Bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only authenticated admins can update booking status (Pending, Confirmed, Completed, Cancelled)
DROP POLICY IF EXISTS "Public Update Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin Update Bookings" ON public.bookings;
CREATE POLICY "Admin Update Bookings"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only authenticated admins can delete bookings
DROP POLICY IF EXISTS "Public Delete Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin Delete Bookings" ON public.bookings;
CREATE POLICY "Admin Delete Bookings"
  ON public.bookings FOR DELETE 
  TO authenticated
  USING (public.is_admin());

-- 6. Helper Trigger to automatically maintain updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_listings_updated_at ON public.listings;
CREATE TRIGGER trigger_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
