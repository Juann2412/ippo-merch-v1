import type { Order, OrderItem, OrderStatus, OrderWithItems } from "@/domain";

export interface CreateOrderInput {
  userId: string;
  status: OrderStatus;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
}

export interface UpdateOrderInput {
  status?: OrderStatus;
  subtotalCents?: number;
  shippingCents?: number;
  totalCents?: number;
  currency?: string;
}

export interface OrderRepository {
  list(options?: { userId?: string; status?: OrderStatus }): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  getWithItems(id: string): Promise<OrderWithItems | null>;
  create(input: CreateOrderInput): Promise<Order>;
  update(id: string, input: UpdateOrderInput): Promise<Order>;
  remove(id: string): Promise<void>;
}

export interface CreateOrderItemInput {
  orderId: string;
  productId: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

export interface UpdateOrderItemInput {
  quantity?: number;
  unitPriceCents?: number;
  lineTotalCents?: number;
}

export interface OrderItemRepository {
  listByOrder(orderId: string): Promise<OrderItem[]>;
  getById(id: string): Promise<OrderItem | null>;
  create(input: CreateOrderItemInput): Promise<OrderItem>;
  update(id: string, input: UpdateOrderItemInput): Promise<OrderItem>;
  remove(id: string): Promise<void>;
}
