export interface Product {
  _id: string;

  title: string;

  description: string;

  price: number;

  discountPrice: number;

  flashDiscountPrice?: number;

  stock: number;

  images: string[];

  category: {
  _id: string;
  name: string;
      };

  unit: string;

  brand: string;

  location: string;

  isFlashSale?: boolean;
}