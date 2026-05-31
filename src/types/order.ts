export interface Order {
  _id: string;

  orderNumber: string;

  customerName: string;

  customerPhone: string;

  totalAmount: number;

  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  createdAt: string;
}