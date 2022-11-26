import { users as usersModel } from '.prisma/client';

import { userOutputsDefaults, userDefaults } from '~/configs';
import { userRequiredFields } from '~/Controllers/userRequiredFields';
import { UsersWithUserOutputs } from '~/DTOs/UsersWithUserOutputs';

import { IUserOutputRepository } from '../Interfaces/IUserOutputRepository';
import { IUsersRepository } from '../Interfaces/IUsersRepository';
import { PlanService } from './Plans.service';

export class UserService {
  constructor(
    private readonly UsersRepo: IUsersRepository,
    private readonly UserOutputRepo: IUserOutputRepository,
    private readonly PlanService: PlanService
  ) {}

  async create(data: userRequiredFields): Promise<UsersWithUserOutputs> {
    const existingUser = await this.UsersRepo.verifyUsername(data.username);

    if (existingUser) {
      throw Error('already exists');
    }
    const { plano: plan, ...dataWithoutPlano } = data;

    if (!(await this.PlanService.HaveCredits(plan))) {
      throw Error("don't have enough credits to create");
    }

    const plano = await this.PlanService.getByIndex(plan);
    const months = typeof plano.meses !== 'undefined' ? plano.meses : 0;
    const hours = typeof plano.horas !== 'undefined' ? plano.horas : 0;
    const days = typeof plano.dias !== 'undefined' ? plano.dias : 0;
    const creationDate = Math.floor(Date.now() / 1000);
    // eslint-disable-next-line prefer-const

    let newExpDateFromTimestamp = new Date(creationDate * 1000);

    /*newExpDateFromTimestamp.setHours(0);
    newExpDateFromTimestamp.setMinutes(0);
    newExpDateFromTimestamp.setSeconds(0);
    newExpDateFromTimestamp.setMilliseconds(0);*/

    newExpDateFromTimestamp.setUTCHours(
      newExpDateFromTimestamp.getUTCHours() + hours
    );
    newExpDateFromTimestamp.setUTCMonth(
      newExpDateFromTimestamp.getUTCMonth() + months
    );
    let expirationDate = Math.floor(newExpDateFromTimestamp.getTime() / 1000);

    const isTrial = plano.teste ? 1 : 0;
    const user = await this.UsersRepo.create({
      ...userDefaults,
      ...dataWithoutPlano,
      created_at: creationDate,
      exp_date: expirationDate,
      is_trial: isTrial,
      max_connections: plano.telas
    });

    const userOutputsToCreate = userOutputsDefaults.map(accessOutputID => ({
      access_output_id: accessOutputID
    }));

    this.PlanService.debit(data.plano);

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

  async renewByUsername(username: string, plan: number): Promise<usersModel> {
    if (!(await this.PlanService.HaveCredits(plan))) {
      throw Error("don't have enough credits to renew");
    }
    const plano = await this.PlanService.getByIndex(plan);
    const user = await this.UsersRepo.getByUsername(username);
    const months = typeof plano.meses !== 'undefined' ? plano.meses : 0;
    const hours = typeof plano.horas !== 'undefined' ? plano.horas : 0;
    const days = typeof plano.dias !== 'undefined' ? plano.dias : 0;

    if (user.exp_date > Math.floor(Date.now() / 1000)) {
      // eslint-disable-next-line prefer-const
      let newExpDateFromTimestamp = new Date(user.exp_date * 1000);
      //newExpDateFromTimestamp.setDate(newExpDateFromTimestamp.getDate() + days);
      newExpDateFromTimestamp.setUTCHours(
        newExpDateFromTimestamp.getUTCHours() + hours
      );
      newExpDateFromTimestamp.setUTCMonth(
        newExpDateFromTimestamp.getUTCMonth() + months
      );
      let newExpirationDate = Math.floor(
        newExpDateFromTimestamp.getTime() / 1000
      );
      const isTrial = plano.teste ? 1 : 0;

      const updatedUser = await this.UsersRepo.updateByID(user.id, {
        max_connections: plano.telas,
        exp_date: newExpirationDate,
        is_trial: isTrial
      });
      this.PlanService.debit(plan);

      return updatedUser;
    }

    // eslint-disable-next-line prefer-const
    let newExpDateFromTimestamp = new Date();

    newExpDateFromTimestamp.setUTCHours(
      newExpDateFromTimestamp.getUTCHours() + hours
    );
    newExpDateFromTimestamp.setUTCMonth(
      newExpDateFromTimestamp.getUTCMonth() + months
    );
    let newExpirationDate = Math.floor(
      newExpDateFromTimestamp.getTime() / 1000
    );
    const isTrial = plano.teste ? 1 : 0;

    const updatedUser = await this.UsersRepo.updateByID(user.id, {
      max_connections: plano.telas,
      exp_date: newExpirationDate,
      is_trial: isTrial
    });
    this.PlanService.debit(plan);

    return updatedUser;
  }

  async deleteByUsername(username: string) {
    const user = await this.UsersRepo.getByUsername(username);
    await this.UsersRepo.deleteByUsername(username);
    await this.UserOutputRepo.deleteManyByUserID(user.id);
  }
}
