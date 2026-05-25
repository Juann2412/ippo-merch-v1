import type {
  CreateOrderInput,
  CreateOrderItemInput,
  OrderItemRepository,
  OrderRepository,
  UpdateOrderInput,
  UpdateOrderItemInput,
} from "@/application/ports/order-repository";
import { api } from "@convex/_generated/api";
import type { ConvexHttpClient } from "convex/browser";
import {
  asOrderId,
  asOrderItemId,
  asProductId,
  asUserId,
  toOrder,
  toOrderItem,
  toOrderWithItems,
} from "@/infrastructure/convex/mappers";

export class ConvexOrderRepository implements OrderRepository {
  constructor(private readonly client: ConvexHttpClient) {}

  async list(options?: { userId?: string; status?: import("@/domain").OrderStatus }) {
    const docs = await this.client.query(api.orders.list, {
      userId: options?.userId ? asUserId(options.userId) : undefined,
      status: options?.status,
    });
    return docs.map(toOrder);
  }

  async getById(id: string) {
    const doc = await this.client.query(api.orders.getById, {
      id: asOrderId(id),
    });
    return doc ? toOrder(doc) : null;
  }

  async getWithItems(id: string) {
    const order = await this.getById(id);
    if (!order) return null;
    const items = await this.client.query(api.order_items.listByOrder, {
      orderId: asOrderId(id),
    });
    const orderDoc = await this.client.query(api.orders.getById, {
      id: asOrderId(id),
    });
    if (!orderDoc) return null;
    return toOrderWithItems(orderDoc, items);
  }

  async create(input: CreateOrderInput) {
    const id = await this.client.mutation(api.orders.create, {
      ...input,
      userId: asUserId(input.userId),
    });
    const doc = await this.client.query(api.orders.getById, { id });
    if (!doc) throw new Error("Échec création commande");
    return toOrder(doc);
  }

  async update(id: string, input: UpdateOrderInput) {
    await this.client.mutation(api.orders.update, {
      id: asOrderId(id),
      ...input,
    });
    const doc = await this.client.query(api.orders.getById, { id: asOrderId(id) });
    if (!doc) throw new Error("Commande introuvable après mise à jour");
    return toOrder(doc);
  }

  async remove(id: string) {
    await this.client.mutation(api.orders.remove, { id: asOrderId(id) });
  }
}

export class ConvexOrderItemRepository implements OrderItemRepository {
  constructor(private readonly client: ConvexHttpClient) {}

  async listByOrder(orderId: string) {
    const docs = await this.client.query(api.order_items.listByOrder, {
      orderId: asOrderId(orderId),
    });
    return docs.map(toOrderItem);
  }

  async getById(id: string) {
    const doc = await this.client.query(api.order_items.getById, {
      id: asOrderItemId(id),
    });
    return doc ? toOrderItem(doc) : null;
  }

  async create(input: CreateOrderItemInput) {
    const id = await this.client.mutation(api.order_items.create, {
      ...input,
      orderId: asOrderId(input.orderId),
      productId: asProductId(input.productId),
    });
    const doc = await this.client.query(api.order_items.getById, { id });
    if (!doc) throw new Error("Échec création ligne de commande");
    return toOrderItem(doc);
  }

  async update(id: string, input: UpdateOrderItemInput) {
    await this.client.mutation(api.order_items.update, {
      id: asOrderItemId(id),
      ...input,
    });
    const doc = await this.client.query(api.order_items.getById, {
      id: asOrderItemId(id),
    });
    if (!doc) throw new Error("Ligne introuvable après mise à jour");
    return toOrderItem(doc);
  }

  async remove(id: string) {
    await this.client.mutation(api.order_items.remove, {
      id: asOrderItemId(id),
    });
  }
}
