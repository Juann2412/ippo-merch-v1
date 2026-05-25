import type {
  CreateUserInput,
  UpdateUserInput,
  UserRepository,
} from "@/application/ports/user-repository";
import type { User } from "@/domain";

export class UserService {
  constructor(private readonly repo: UserRepository) {}

  list(): Promise<User[]> {
    return this.repo.list();
  }

  getById(id: string): Promise<User | null> {
    return this.repo.getById(id);
  }

  getCurrent(): Promise<User | null> {
    return this.repo.getCurrent();
  }

  syncFromClerk(): Promise<string> {
    return this.repo.syncFromClerk();
  }

  create(input: CreateUserInput): Promise<User> {
    return this.repo.create(input);
  }

  update(id: string, input: UpdateUserInput): Promise<User> {
    return this.repo.update(id, input);
  }

  remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

export type { CreateUserInput, UpdateUserInput };
