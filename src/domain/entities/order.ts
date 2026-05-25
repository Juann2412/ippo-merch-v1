import type { OrderStatus } from "../value-objects/order-status";

/** Commande — appartient à un User */
export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  createdAt: number;
  updatedAt: number;
}
