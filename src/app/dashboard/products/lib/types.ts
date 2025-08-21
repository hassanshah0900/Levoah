export interface Product {
  id: string;
  image_url: string;
  title: string;
  description?: string;
  price: number;
  sale_price: number;
  published: boolean;
}
