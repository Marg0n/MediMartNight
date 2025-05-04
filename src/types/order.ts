import { IUser } from "./customer";
import { TMedicine } from "./medicine";

export interface IProductItem {
  _id: string;
  productId: string;
  quantity: number;
  product?: TMedicine;
  price?: number;
  name?: string;
  inStock?: boolean;
}

export type ShippingStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED"

export interface IOrderDB {
  _id: string;
  products: IProductItem[];
  user: IUser;
  totalPrice: number;
  shippingStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | string;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED" | string;
  transactionId: string;
  isDeleted: boolean;
  city: string;
  shippingAddress: string;
  shippingCost?: number;
  createdAt?: string | Date;
}
