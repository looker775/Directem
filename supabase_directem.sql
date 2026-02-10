-- Directem marketplace schema

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  role text CHECK (role IN ('owner', 'admin', 'buyer')) DEFAULT 'buyer',
  full_name text,
  phone text,
  country text,
  admin_approved boolean DEFAULT false,
  admin_blocked boolean DEFAULT false,
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PACKAGES AVAILABLE FOR PURCHASE
CREATE TABLE IF NOT EXISTS public.directem_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  employer_count integer NOT NULL CHECK (employer_count > 0),
  price_usd numeric NOT NULL CHECK (price_usd >= 0),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.directem_packages
  ADD CONSTRAINT directem_packages_employer_count_unique UNIQUE (employer_count);

-- EMPLOYER CONTACTS
CREATE TABLE IF NOT EXISTS public.directem_employers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text,
  job_title text,
  whatsapp text,
  phone text,
  email text,
  city text,
  country text DEFAULT 'UAE',
  notes text,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PURCHASE REQUESTS + APPROVALS
CREATE TABLE IF NOT EXISTS public.directem_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid REFERENCES public.profiles(id) NOT NULL,
  package_id uuid REFERENCES public.directem_packages(id) NOT NULL,
  status text CHECK (status IN ('pending', 'active', 'rejected', 'expired')) DEFAULT 'pending',
  employer_limit integer NOT NULL,
  price_usd numeric NOT NULL,
  local_currency text,
  local_amount numeric,
  payment_reference text,
  preferred_job text,
  preferred_city text,
  salary_expectation text,
  request_notes text,
  approved_by uuid REFERENCES public.profiles(id),
  approved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.directem_purchases
  ADD COLUMN IF NOT EXISTS preferred_job text,
  ADD COLUMN IF NOT EXISTS preferred_city text,
  ADD COLUMN IF NOT EXISTS salary_expectation text,
  ADD COLUMN IF NOT EXISTS request_notes text;

-- CONTACT ACCESS ROWS
CREATE TABLE IF NOT EXISTS public.directem_employer_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id uuid REFERENCES public.directem_purchases(id) ON DELETE CASCADE NOT NULL,
  buyer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  employer_id uuid REFERENCES public.directem_employers(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (purchase_id, employer_id),
  UNIQUE (buyer_id, employer_id)
);

CREATE INDEX IF NOT EXISTS idx_directem_employers_created_at ON public.directem_employers(created_at);
CREATE INDEX IF NOT EXISTS idx_directem_purchases_buyer_id ON public.directem_purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_directem_access_buyer_id ON public.directem_employer_access(buyer_id);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directem_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directem_employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directem_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directem_employer_access ENABLE ROW LEVEL SECURITY;

-- PROFILE POLICIES
DROP POLICY IF EXISTS "Profiles read own" ON public.profiles;
DROP POLICY IF EXISTS "Owner read admins" ON public.profiles;
DROP POLICY IF EXISTS "Profiles update own" ON public.profiles;
DROP POLICY IF EXISTS "Owner manage admins" ON public.profiles;

CREATE POLICY "Profiles read own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Owner read admins" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'owner'
    )
    AND role = 'admin'
  );

CREATE POLICY "Profiles update own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Owner manage admins" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'owner'
    )
    AND role = 'admin'
  )
  WITH CHECK (role = 'admin');

-- ADMIN / OWNER CHECK
CREATE OR REPLACE FUNCTION public.directem_can_manage()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND (
        p.role = 'owner'
        OR (
          p.role = 'admin'
          AND p.admin_approved = true
          AND p.admin_blocked = false
        )
      )
  );
$$;

-- PACKAGE POLICIES
DROP POLICY IF EXISTS "Directem packages read" ON public.directem_packages;
DROP POLICY IF EXISTS "Directem packages manage" ON public.directem_packages;

CREATE POLICY "Directem packages read" ON public.directem_packages
  FOR SELECT USING (true);

CREATE POLICY "Directem packages manage" ON public.directem_packages
  FOR ALL USING (public.directem_can_manage())
  WITH CHECK (public.directem_can_manage());

-- EMPLOYER POLICIES
DROP POLICY IF EXISTS "Directem employers read admin" ON public.directem_employers;
DROP POLICY IF EXISTS "Directem employers read buyer" ON public.directem_employers;
DROP POLICY IF EXISTS "Directem employers manage" ON public.directem_employers;

CREATE POLICY "Directem employers read admin" ON public.directem_employers
  FOR SELECT USING (public.directem_can_manage());

CREATE POLICY "Directem employers read buyer" ON public.directem_employers
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.directem_employer_access a
      WHERE a.employer_id = directem_employers.id
        AND a.buyer_id = auth.uid()
    )
  );

CREATE POLICY "Directem employers manage" ON public.directem_employers
  FOR ALL USING (public.directem_can_manage())
  WITH CHECK (public.directem_can_manage());

-- PURCHASE POLICIES
DROP POLICY IF EXISTS "Directem purchases read own" ON public.directem_purchases;
DROP POLICY IF EXISTS "Directem purchases read admin" ON public.directem_purchases;
DROP POLICY IF EXISTS "Directem purchases insert own" ON public.directem_purchases;
DROP POLICY IF EXISTS "Directem purchases update admin" ON public.directem_purchases;

CREATE POLICY "Directem purchases read own" ON public.directem_purchases
  FOR SELECT USING (buyer_id = auth.uid());

CREATE POLICY "Directem purchases read admin" ON public.directem_purchases
  FOR SELECT USING (public.directem_can_manage());

CREATE POLICY "Directem purchases insert own" ON public.directem_purchases
  FOR INSERT WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Directem purchases update admin" ON public.directem_purchases
  FOR UPDATE USING (public.directem_can_manage())
  WITH CHECK (public.directem_can_manage());

-- ACCESS POLICIES
DROP POLICY IF EXISTS "Directem access read own" ON public.directem_employer_access;
DROP POLICY IF EXISTS "Directem access manage" ON public.directem_employer_access;

CREATE POLICY "Directem access read own" ON public.directem_employer_access
  FOR SELECT USING (buyer_id = auth.uid() OR public.directem_can_manage());

CREATE POLICY "Directem access manage" ON public.directem_employer_access
  FOR ALL USING (public.directem_can_manage())
  WITH CHECK (public.directem_can_manage());

-- AUTO-FILL PURCHASE VALUES FROM PACKAGE
CREATE OR REPLACE FUNCTION public.directem_set_purchase_defaults()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  pkg record;
BEGIN
  SELECT employer_count, price_usd, is_active
  INTO pkg
  FROM public.directem_packages
  WHERE id = NEW.package_id;

  IF pkg.employer_count IS NULL THEN
    RAISE EXCEPTION 'Invalid package';
  END IF;

  IF pkg.is_active = false THEN
    RAISE EXCEPTION 'Package inactive';
  END IF;

  NEW.employer_limit := pkg.employer_count;
  NEW.price_usd := pkg.price_usd;
  NEW.status := COALESCE(NEW.status, 'pending');
  NEW.created_at := COALESCE(NEW.created_at, timezone('utc'::text, now()));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS directem_purchase_defaults ON public.directem_purchases;
CREATE TRIGGER directem_purchase_defaults
  BEFORE INSERT ON public.directem_purchases
  FOR EACH ROW EXECUTE PROCEDURE public.directem_set_purchase_defaults();

-- APPROVE PURCHASE + ASSIGN CONTACTS
CREATE OR REPLACE FUNCTION public.directem_approve_purchase(p_purchase_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_buyer uuid;
  v_limit integer;
  v_assigned integer := 0;
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND (
        p.role = 'owner'
        OR (
          p.role = 'admin'
          AND p.admin_approved = true
          AND p.admin_blocked = false
        )
      )
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT buyer_id, employer_limit
    INTO v_buyer, v_limit
  FROM public.directem_purchases
  WHERE id = p_purchase_id;

  IF v_buyer IS NULL THEN
    RAISE EXCEPTION 'Purchase not found';
  END IF;

  UPDATE public.directem_purchases
  SET status = 'active',
      approved_by = auth.uid(),
      approved_at = timezone('utc'::text, now())
  WHERE id = p_purchase_id;

  INSERT INTO public.directem_employer_access (purchase_id, buyer_id, employer_id)
  SELECT p_purchase_id, v_buyer, e.id
  FROM public.directem_employers e
  WHERE e.is_active = true
    AND NOT EXISTS (
      SELECT 1
      FROM public.directem_employer_access a
      WHERE a.buyer_id = v_buyer
        AND a.employer_id = e.id
    )
  ORDER BY e.created_at DESC
  LIMIT v_limit;

  GET DIAGNOSTICS v_assigned = ROW_COUNT;
  RETURN v_assigned;
END;
$$;

-- FUNCTION TO HANDLE NEW USER SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  role_text text;
BEGIN
  role_text := COALESCE(new.raw_user_meta_data->>'role', 'buyer');

  IF new.email = 'kaliwilll3@gmail.com' THEN
    role_text := 'owner';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, phone, role, admin_approved, admin_blocked)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    role_text,
    CASE WHEN role_text = 'admin' THEN false ELSE true END,
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- SEED DEFAULT PACKAGES (10/20/30)
INSERT INTO public.directem_packages (name, employer_count, price_usd)
VALUES
  ('Starter 10', 10, 60),
  ('Growth 20', 20, 100),
  ('Scale 30', 30, 140)
ON CONFLICT (employer_count)
DO UPDATE SET
  name = EXCLUDED.name,
  price_usd = EXCLUDED.price_usd,
  is_active = true;
