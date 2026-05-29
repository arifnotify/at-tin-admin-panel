export interface Product {
  _id: string;

  title: string;

  price: number;

  stock: number;

  images: string[];

  category: {
    name: string;
  };
}