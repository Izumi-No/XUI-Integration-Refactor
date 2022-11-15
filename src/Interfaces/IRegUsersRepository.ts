import { reg_users } from '@prisma/client';

export interface IRegUsersRepository {
  update(id: number, data: Partial<reg_users>): Promise<reg_users>;
  getByID(id: number): Promise<reg_users>;
}
