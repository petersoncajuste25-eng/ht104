export type Language = 'ht' | 'fr' | 'en';

export type ProductStatus = 'in_stock' | 'on_order';

export type Category =
  | 'Electronics'
  | 'Clothing'
  | 'Home & Living'
  | 'Beauty & Care'
  | 'Sports'
  | 'Bags'
  | 'Tools'
  | 'Kids & Baby'
  | 'Jewelry'
  | 'Other';

export interface Product {
  id: string;
  name_ht: string;
  name_fr: string;
  name_en: string;
  description_ht: string;
  description_fr: string;
  description_en: string;
  price: number;
  category: Category;
  status: ProductStatus;
  has_variants: boolean;
  image_url: string;
  thumbnail_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size?: string;
  color?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_method: 'pickup' | 'delivery';
  delivery_address?: {
    street: string;
    city: string;
    department: string;
    phone: string;
  };
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_status: 'pending_50' | 'paid_50' | 'fully_paid';
  order_status: 'pending' | 'confirmed' | 'ready' | 'delivered';
  special_instructions?: string;
  admin_notes?: string;
  first_payment_date?: string;
  final_payment_date?: string;
  confirmed_at?: string;
  ready_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  department?: string;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}

export interface Translations {
  [key: string]: {
    ht: string;
    fr: string;
    en: string;
  };
}
