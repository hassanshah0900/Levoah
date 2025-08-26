export interface Product {
  id: string;
  image_url: string;
  title: string;
  description?: string;
  price: number;
  sale_price: number;
  published: boolean;
  [key: string]: any;
}

export interface ProductVariant {
  price: number;
  quantity_in_stock: number;
  frame_color: string;
  lense_color: string;
  product_id: number;
  image_url: string;
}
