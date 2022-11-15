import { configs } from '~/configs';
import { IRegUsersRepository } from '~/Interfaces/IRegUsersRepository';
import { plan } from '~/Types/planTypes';

export class PlanService {
  constructor(
    private readonly RegUsersRepo: IRegUsersRepository,
    private readonly plans: plan[]
  ) {}

  listAll(): plan[] {
    return this.plans;
  }

  async getByIndex(index: number): Promise<plan> {
    return this.plans[index];
  }

  async debit(plano: number) {
    const regUser = await this.RegUsersRepo.getByID(configs.memberID);
    if (regUser.credits < this.plans[plano].custo) {
      throw Error("don't have enough credits");
    }
    const newCredits = regUser.credits - this.plans[plano].custo;
    return await this.RegUsersRepo.update(configs.memberID, {
      credits: newCredits
    });
  }

  async HaveCredits(plano: number): Promise<boolean> {
    const regUser = await this.RegUsersRepo.getByID(configs.memberID);
    if (regUser.credits < this.plans[plano].custo) {
      return false;
    }
    return true;
  }
}
