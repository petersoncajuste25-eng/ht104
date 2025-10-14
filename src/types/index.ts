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
  status: string;
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
