import {
  users as usersModel,
  user_output as userOutputModel
} from '.prisma/client';

import { userOutputsDefaults, userDefaults } from '~/configs';
import { userRequiredFields } from '~/Controllers/userRequiredFields';
import { UsersWithUserOutputs } from '~/DTOs/UsersWithUserOutputs';

import { IUserOutputRepository } from '../Interfaces/IUserOutputRepository';
import { IUsersRepository } from '../Interfaces/IUsersRepository';

export class UserService {
  constructor(
    private readonly UsersRepo: IUsersRepository,
    private readonly UserOutputRepo: IUserOutputRepository
  ) {}

  async create(data: userRequiredFields): Promise<UsersWithUserOutputs> {
    const existingUser = await this.UsersRepo.verifyUsername(data.username);

    if (existingUser) {
      throw Error('already exists');
    }
    const user = await this.UsersRepo.create({ ...userDefaults, ...data });
    const userOutputsToCreate = userOutputsDefaults.map(accessOutputID => ({
      access_output_id: accessOutputID
    }));
    const userOutputs = await this.UserOutputRepo.createMany(
      user.id,
      userOutputsToCreate
    );
    return [user, userOutputs];
  }

  async list(): Promise<UsersWithUserOutputs[]> {
    const users = await this.UsersRepo.getAll();
    const usersAndUserOutputs = users.map(
      async (user): Promise<UsersWithUserOutputs> => {
        const userOutputs = await this.UserOutputRepo.getAllByUserID(user.id);
        return [user, userOutputs];
      }
    );

    return await Promise.all(usersAndUserOutputs);
  }

  async getByUsername(username: string): Promise<UsersWithUserOutputs> {
    const user = await this.UsersRepo.getByUsername(username);
    const userOutputs = await this.UserOutputRepo.getAllByUserID(user.id);
    return [user, userOutputs];
  }

  async updateByUsername(
    username: string,
    userData: Partial<Omit<usersModel, 'id'>>,
    acessOutputData: number[] = userOutputsDefaults
  ): Promise<UsersWithUserOutputs> {
    const user = await this.UsersRepo.getByUsername(username);
    const updatedUser = await this.UsersRepo.updateByID(user.id, userData);
    await this.UserOutputRepo.deleteManyByUserID(user.id);
    const userOutputsToCreate = acessOutputData.map(accessOutputID => ({
      access_output_id: accessOutputID
    }));
    const userOutputs = await this.UserOutputRepo.createMany(
      user.id,
      userOutputsToCreate
    );
    return [updatedUser, userOutputs];
  }

  async deleteByUsername(username: string) {
    const user = await this.UsersRepo.getByUsername(username);
    await this.UsersRepo.deleteByUsername(username);
    await this.UserOutputRepo.deleteManyByUserID(user.id);
  }
}
