import { UpdateUserController } from "~/Controllers/Users"
import { UserService } from "~/Services/User.service"
import { UsersRepository } from "~/Repositories/Users.repositoy"
import { UserOutputRepository } from "~/Repositories/UserOutput.repository"

export function UpdateUserControllerFactory () {
    let UsersRepositoryInstance = new UsersRepository
    let UserOutputRepositoryInstance = new UserOutputRepository
    let UserServiceInstance = new UserService(UsersRepositoryInstance, UserOutputRepositoryInstance)
    return new UpdateUserController(UserServiceInstance)
}