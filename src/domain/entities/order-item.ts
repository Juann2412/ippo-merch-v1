/** Ligne de commande — lie Order et Product (prix figé à la commande) */
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}
