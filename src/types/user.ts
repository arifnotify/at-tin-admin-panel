export interface User {
  _id: string;

  name?: string;

  phone: string;

  isBlocked: boolean;

  createdAt: string;

  totalOrders?: number;

  totalSpent?: number;
}