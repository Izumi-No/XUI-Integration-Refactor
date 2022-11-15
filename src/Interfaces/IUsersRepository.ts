import { users } from '@prisma/client';

export interface IUsersRepository {
  create(data: Omit<users, 'id'>): Promise<users>;
  getAll(): Promise<users[]>;
  getByID(id: number): Promise<users | Error>;
  deleteByID(id: number): Promise<void>;
  updateByID(id: number, data: Partial<Omit<users, 'id'>>): Promise<users>;
  getByUsername(username: string): Promise<users>;
  deleteByUsername(username: string): Promise<void>;
  updateByUsername(
    username: string,
    data: Partial<Omit<users, 'id'>>
  ): Promise<users>;
  verifyUsername(username: string): Promise<boolean>;
}
