import { user_output } from '@prisma/client';

export interface IUserOutputRepository {
  createMany(
    user_id: number,
    data: Omit<user_output, 'id' | 'user_id'>[]
  ): Promise<user_output[]>;
  getAllByUserID(user_id: number): Promise<user_output[]>;
  deleteManyByUserID(user_id: number): Promise<void>;
}
