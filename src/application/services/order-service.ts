import type {
  CreateOrderInput,
  CreateOrderItemInput,
  OrderItemRepository,
  OrderRepository,
  UpdateOrderInput,
  UpdateOrderItemInput,
} from "@/application/ports/order-repository";
import type { Order, OrderItem, OrderStatus, OrderWithItems } from "@/domain";

export class OrderService {
  constructor(
    private readonly orders: OrderRepository,
    private readonly items: OrderItemRepository,
  ) {}

  list(options?: { userId?: string; status?: OrderStatus }): Promise<Order[]> {
    return this.orders.list(options);
  }

  getById(id: string): Promise<Order | null> {
    return this.orders.getById(id);
  }

  getWithItems(id: string): Promise<OrderWithItems | null> {
    return this.orders.getWithItems(id);
  }

  create(input: CreateOrderInput): Promise<Order> {
    return this.orders.create(input);
  }

  update(id: string, input: UpdateOrderInput): Promise<Order> {
    return this.orders.update(id, input);
  }

  remove(id: string): Promise<void> {
    return this.orders.remove(id);
  }

  listItems(orderId: string): Promise<OrderItem[]> {
    return this.items.listByOrder(orderId);
  }

  getItemById(id: string): Promise<OrderItem | null> {
    return this.items.getById(id);
  }

  createItem(input: CreateOrderItemInput): Promise<OrderItem> {
    return this.items.create(input);
  }

  updateItem(id: string, input: UpdateOrderItemInput): Promise<OrderItem> {
    return this.items.update(id, input);
  }

  removeItem(id: string): Promise<void> {
    return this.items.remove(id);
  }
}

export type {
  CreateOrderInput,
  UpdateOrderInput,
  CreateOrderItemInput,
  UpdateOrderItemInput,
};
