/*
  # Add User Profiles and Enhanced E-commerce Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text) - User's full name
      - `phone` (text) - Phone number
      - `address` (text) - Street address
      - `city` (text) - City
      - `department` (text) - Department/State
      - `role` (text) - 'customer' or 'admin'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `categories`
      - `id` (uuid, primary key)
      - `name_ht` (text) - Category name in Haitian Creole
      - `name_fr` (text) - Category name in French
      - `name_en` (text) - Category name in English
      - `icon` (text) - Icon name or class
      - `created_at` (timestamptz)

  2. Enhanced Existing Tables
    - Add columns to products:
      - `category_id` (uuid, nullable for now) - Foreign key to categories
      - `stock_quantity` (integer) - Available stock
      - `sales_count` (integer) - Number of times sold
      - `available_sizes` (text[]) - Array of available sizes
      - `available_colors` (text[]) - Array of available colors
      - `images` (text[]) - Array of image URLs
    
    - Add columns to orders:
      - `customer_name` (text) - Name at time of order
      - `customer_email` (text) - Email at time of order
      - `customer_phone` (text) - Phone at time of order
      - `payment_status` (text) - 'pending_50', 'paid_50', 'fully_paid'
      - `order_status` (text) - 'pending', 'confirmed', 'ready', 'delivered'
      - `special_instructions` (text) - Customer notes
      - `admin_notes` (text) - Internal admin notes
      - `first_payment_date` (timestamptz) - When 50% was paid
      - `final_payment_date` (timestamptz) - When remaining 50% was paid
      - `confirmed_at` (timestamptz)
      - `ready_at` (timestamptz)
      - `delivered_at` (timestamptz)

  3. Security
    - Enable RLS on new tables
    - User profiles: Users can view/update own profile, admins can view all
    - Categories: Public read, admin write
    - Enhanced orders: Admin can view/update all orders
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  address text,
  city text,
  department text,
  role text NOT NULL DEFAULT 'customer',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ht text NOT NULL,
  name_fr text NOT NULL,
  name_en text NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Add new columns to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE products ADD COLUMN category_id uuid REFERENCES categories(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'stock_quantity'
  ) THEN
    ALTER TABLE products ADD COLUMN stock_quantity integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'sales_count'
  ) THEN
    ALTER TABLE products ADD COLUMN sales_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'available_sizes'
  ) THEN
    ALTER TABLE products ADD COLUMN available_sizes text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'available_colors'
  ) THEN
    ALTER TABLE products ADD COLUMN available_colors text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'images'
  ) THEN
    ALTER TABLE products ADD COLUMN images text[];
  END IF;
END $$;

-- Add new columns to orders table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'customer_name'
  ) THEN
    ALTER TABLE orders ADD COLUMN customer_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'customer_email'
  ) THEN
    ALTER TABLE orders ADD COLUMN customer_email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'customer_phone'
  ) THEN
    ALTER TABLE orders ADD COLUMN customer_phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'payment_status'
  ) THEN
    ALTER TABLE orders ADD COLUMN payment_status text DEFAULT 'pending_50';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'order_status'
  ) THEN
    ALTER TABLE orders ADD COLUMN order_status text DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'special_instructions'
  ) THEN
    ALTER TABLE orders ADD COLUMN special_instructions text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'admin_notes'
  ) THEN
    ALTER TABLE orders ADD COLUMN admin_notes text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'first_payment_date'
  ) THEN
    ALTER TABLE orders ADD COLUMN first_payment_date timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'final_payment_date'
  ) THEN
    ALTER TABLE orders ADD COLUMN final_payment_date timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'confirmed_at'
  ) THEN
    ALTER TABLE orders ADD COLUMN confirmed_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'ready_at'
  ) THEN
    ALTER TABLE orders ADD COLUMN ready_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'delivered_at'
  ) THEN
    ALTER TABLE orders ADD COLUMN delivered_at timestamptz;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Admin policies for orders (admins can see and update all orders)
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Admin policies for products
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Insert default categories
INSERT INTO categories (name_ht, name_fr, name_en, icon) VALUES
('Elektwonik', 'Électronique', 'Electronics', 'Smartphone'),
('Rad', 'Vêtements', 'Clothing', 'Shirt'),
('Lakay & Vi', 'Maison & Vie', 'Home & Living', 'Home'),
('Bote & Swen', 'Beauté & Soins', 'Beauty & Care', 'Sparkles'),
('Espò', 'Sports', 'Sports', 'Dumbbell'),
('Sak', 'Sacs', 'Bags', 'ShoppingBag'),
('Zouti', 'Outils', 'Tools', 'Wrench'),
('Timoun & Bebe', 'Enfants & Bébé', 'Kids & Baby', 'Baby'),
('Bijou', 'Bijoux', 'Jewelry', 'Gem'),
('Lòt', 'Autre', 'Other', 'Package')
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'customer'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
