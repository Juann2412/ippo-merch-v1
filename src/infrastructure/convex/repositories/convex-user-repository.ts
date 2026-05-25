import type {
  CreateUserInput,
  UpdateUserInput,
  UserRepository,
} from "@/application/ports/user-repository";
import { api } from "@convex/_generated/api";
import type { ConvexHttpClient } from "convex/browser";
import { asUserId, toUser } from "@/infrastructure/convex/mappers";

export class ConvexUserRepository implements UserRepository {
  constructor(private readonly client: ConvexHttpClient) {}

  async list() {
    const docs = await this.client.query(api.users.list, {});
    return docs.map(toUser);
  }

  async getById(id: string) {
    const doc = await this.client.query(api.users.getById, { id: asUserId(id) });
    return doc ? toUser(doc) : null;
  }

  async getCurrent() {
    const doc = await this.client.query(api.users.getCurrentUser, {});
    return doc ? toUser(doc) : null;
  }

  async syncFromClerk() {
    return await this.client.mutation(api.users.store, {});
  }

  async create(input: CreateUserInput) {
    const id = await this.client.mutation(api.users.create, input);
    const doc = await this.client.query(api.users.getById, { id });
    if (!doc) throw new Error("Échec création utilisateur");
    return toUser(doc);
  }

  async update(id: string, input: UpdateUserInput) {
    await this.client.mutation(api.users.update, { id: asUserId(id), ...input });
    const doc = await this.client.query(api.users.getById, { id: asUserId(id) });
    if (!doc) throw new Error("Utilisateur introuvable après mise à jour");
    return toUser(doc);
  }

  async remove(id: string) {
    await this.client.mutation(api.users.remove, { id: asUserId(id) });
  }
}
