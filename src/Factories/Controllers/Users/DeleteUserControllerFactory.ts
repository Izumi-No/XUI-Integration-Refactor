import { DeleteUserController } from "~/Controllers/Users"
import { UserService } from "~/Services/User.service"
import { UsersRepository } from "~/Repositories/Users.repositoy"
import { UserOutputRepository } from "~/Repositories/UserOutput.repository"

export function DeleteUserControllerFactory(){
    let UsersRepositoryInstance = new UsersRepository
    let UserOutputRepositoryInstance = new UserOutputRepository
    let UserServiceInstance = new UserService(UsersRepositoryInstance, UserOutputRepositoryInstance)
    return new DeleteUserController(UserServiceInstance)
}