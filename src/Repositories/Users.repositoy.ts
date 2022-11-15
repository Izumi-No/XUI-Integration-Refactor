import { users } from '@prisma/client';
import { configs } from '~/configs';

import { PrismaClient } from '../Connections/Prisma/client';
import { IUsersRepository } from '../Interfaces/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  async create(data: Omit<users, 'id'>): Promise<users> {
    return await PrismaClient.users.create({ data });
  }

  async getAll(): Promise<users[]> {
    return await PrismaClient.users.findMany({
      where: {
        member_id: configs.memberID
      }
    });
  }

  async getByID(id: number): Promise<users> {
    return await PrismaClient.users.findUniqueOrThrow({ where: { id } });
  }

  async deleteByID(id: number): Promise<void> {
    const user = await this.getByID(id);
    if (user.member_id != configs.memberID) {
      throw Error('the user does not belong to this member_id');
    }
    await PrismaClient.users.delete({ where: { id } });
  }

  async updateByID(
    id: number,
    data: Partial<Omit<users, 'id'>>
  ): Promise<users> {
    const user = await this.getByID(id);
    if (user.member_id != configs.memberID) {
      throw Error('the user does not belong to this member_id');
    }
    return await PrismaClient.users.update({ data, where: { id } });
  }

  async getByUsername(username: string): Promise<users> {
    const [user] = await PrismaClient.users.findMany({
      where: { username, member_id: configs.memberID }
    });
    return user;
  }

  async deleteByUsername(username: string): Promise<void> {
    const user = await this.getByUsername(username);
    if (user.member_id != configs.memberID) {
      throw Error('the user does not belong to this member_id');
    }
    return await this.deleteByID(user.id);
  }

  async updateByUsername(
    username: string,
    data: Partial<Omit<users, 'id'>>
  ): Promise<users> {
    const user = await this.getByUsername(username);
    if (user.member_id != configs.memberID) {
      throw Error('the user does not belong to this member_id');
    }
    return await this.updateByID(user.id, data);
  }

  async verifyUsername(username: string): Promise<boolean> {
    const [user] = await PrismaClient.users.findMany({
      where: {
        username,
        member_id: configs.memberID
      }
    });
    return !!user;
  }
}
