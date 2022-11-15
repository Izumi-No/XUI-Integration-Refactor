import { ListUserController } from '~/Controllers/Users';
import { planos } from '~/Plans';
import { RegUsersRepository } from '~/Repositories/RegUsers.repository';
import { UserOutputRepository } from '~/Repositories/UserOutput.repository';
import { UsersRepository } from '~/Repositories/Users.repositoy';
import { PlanService } from '~/Services/Plans.service';
import { UserService } from '~/Services/User.service';

export function ListUserControllerFactory() {
  const UsersRepositoryInstance = new UsersRepository();
  const UserOutputRepositoryInstance = new UserOutputRepository();
  const RegUsersRepositoryInstance = new RegUsersRepository();
  const PlanServiceInstance = new PlanService(
    RegUsersRepositoryInstance,
    planos
  );
  const UserServiceInstance = new UserService(
    UsersRepositoryInstance,
    UserOutputRepositoryInstance,
    PlanServiceInstance
  );
  return new ListUserController(UserServiceInstance);
}
