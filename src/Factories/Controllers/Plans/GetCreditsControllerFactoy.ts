import { GetCreditsController } from '~/Controllers/Plans';
import { planos } from '~/Plans';
import { RegUsersRepository } from '~/Repositories/RegUsers.repository';
import { PlanService } from '~/Services/Plans.service';

export function GetCreditsControllerFactory() {
  const RegUsersRepositoryInstance = new RegUsersRepository();
  const PlanServiceInstance = new PlanService(
    RegUsersRepositoryInstance,
    planos
  );
  return new GetCreditsController(PlanServiceInstance);
}
