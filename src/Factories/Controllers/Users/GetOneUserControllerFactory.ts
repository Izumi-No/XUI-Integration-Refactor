import { GetOneUserController } from '~/Controllers/Users';
import { UserOutputRepository } from '~/Repositories/UserOutput.repository';
import { UsersRepository } from '~/Repositories/Users.repositoy';
import { UserService } from '~/Services/User.service';

export function GetOneUserControllerFactory() {
  const UsersRepositoryInstance = new UsersRepository();
  const UserOutputRepositoryInstance = new UserOutputRepository();
  const UserServiceInstance = new UserService(
    UsersRepositoryInstance,
    UserOutputRepositoryInstance
  );
  return new GetOneUserController(UserServiceInstance);
}
