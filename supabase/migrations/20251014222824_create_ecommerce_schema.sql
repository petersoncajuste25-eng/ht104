/*
  # Create E-commerce Schema for Ht104

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name_ht` (text) - Product name in Haitian Creole
      - `name_fr` (text) - Product name in French
      - `name_en` (text) - Product name in English
      - `description_ht` (text) - Description in Haitian Creole
      - `description_fr` (text) - Description in French
      - `description_en` (text) - Description in English
      - `price` (decimal) - Price in HTG
      - `category` (text) - Product category
      - `status` (text) - 'in_stock' or 'on_order'
      - `has_variants` (boolean) - Whether product has size/color variants
      - `image_url` (text) - Main product image
      - `thumbnail_urls` (jsonb) - Array of thumbnail URLs
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `product_variants`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `size` (text, nullable) - Size option
      - `color` (text, nullable) - Color option
      - `created_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `order_number` (text, unique) - Display order number
      - `delivery_method` (text) - 'pickup' or 'delivery'
      - `delivery_address` (jsonb, nullable) - Address details if delivery
      - `subtotal` (decimal)
      - `delivery_fee` (decimal)
      - `total` (decimal)
      - `status` (text) - Order status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer)
      - `size` (text, nullable)
      - `color` (text, nullable)
      - `price` (decimal) - Price at time of order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Products: Public read access
    - Orders: Users can only access their own orders
    - Order items: Access through orders
    - Product variants: Public read access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ht text NOT NULL,
  name_fr text NOT NULL,
  name_en text NOT NULL,
  description_ht text NOT NULL,
  description_fr text NOT NULL,
  description_en text NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'in_stock',
  has_variants boolean DEFAULT false,
  image_url text NOT NULL,
  thumbnail_urls jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size text,
  color text,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number text UNIQUE NOT NULL,
  delivery_method text NOT NULL,
  delivery_address jsonb,
  subtotal decimal(10,2) NOT NULL,
  delivery_fee decimal(10,2) DEFAULT 0,
  total decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  size text,
  color text,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO public
  USING (true);

-- Product variants policies (public read)
CREATE POLICY "Product variants are viewable by everyone"
  ON product_variants FOR SELECT
  TO public
  USING (true);

-- Orders policies (users can only see their own)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Order items policies (access through orders)
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);