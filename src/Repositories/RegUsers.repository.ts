import { reg_users } from '@prisma/client';
import { IRegUsersRepository } from '~/Interfaces/IRegUsersRepository';

import { PrismaClient } from '../Connections/Prisma/client';

export class RegUsersRepository implements IRegUsersRepository {
  async update(id: number, data: Partial<reg_users>): Promise<reg_users> {
    return await PrismaClient.reg_users.update({ where: { id }, data });
  }

  async getByID(id: number): Promise<reg_users> {
    return await PrismaClient.reg_users.findUniqueOrThrow({ where: { id } });
  }
}
