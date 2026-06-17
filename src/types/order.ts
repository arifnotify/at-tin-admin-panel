export type OrderStatus =
  | "Pending"
  | "Processing"
  | "OutForDelivery"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  product?: string;

  productName: string;

  productImage: string;

  quantity: number;

  price: number;

  totalPrice: number;
}

export interface Order {
  _id: string;

  orderNumber: string;

  customerPhone: string;

  shippingAddress: string;

  items: OrderItem[];

  totalAmount: number;

  paymentMethod: string;

  orderStatus: OrderStatus;

  isPaid: boolean;

  assignedRider?: string | null;

  trackingEnabled: boolean;

  riderLat?: number | null;

  riderLng?: number | null;

  lastLocationUpdate?: string | null;

  createdAt: string;

  updatedAt: string;
}