import type { User } from "@/domain";

export interface CreateUserInput {
  clerkId: string;
  email: string;
  name?: string;
  imageUrl?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  imageUrl?: string;
}

export interface UserRepository {
  list(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getCurrent(): Promise<User | null>;
  syncFromClerk(): Promise<string>;
  create(input: CreateUserInput): Promise<User>;
  update(id: string, input: UpdateUserInput): Promise<User>;
  remove(id: string): Promise<void>;
}
