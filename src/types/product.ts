export interface Product {
  _id: string;

  name: string;

  price: number;

  stock: number;

  images: string[];

  category: {
    name: string;
  };
}