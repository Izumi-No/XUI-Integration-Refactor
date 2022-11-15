import { users as usersModel, user_output as userOutputModel } from ".prisma/client";
import { userOutputsDefaults, userDefaults } from "~/configs";
import { userRequiredFields } from "~/Controllers/userRequiredFields";
import { UsersWithUserOutputs } from "~/DTOs/UsersWithUserOutputs";
import { IUserOutputRepository } from "../Interfaces/IUserOutputRepository";
import { IUsersRepository } from "../Interfaces/IUsersRepository";



export class UserService {


    constructor(private readonly UsersRepo: IUsersRepository, private readonly UserOutputRepo: IUserOutputRepository) {

    }
    async create(data: userRequiredFields): Promise<UsersWithUserOutputs>{
        
        if (await this.UsersRepo.verifyUsername(data.username)){
            throw Error("already exists")
        }
        let user = await this.UsersRepo.create({...userDefaults, ...data})
        let userOutputsToCreate = userOutputsDefaults.map((accessOutputID) => ({ access_output_id: accessOutputID }))
        let userOutputs = await this.UserOutputRepo.createMany(user.id, userOutputsToCreate)
       return [user,userOutputs]
    }
    async list(): Promise<UsersWithUserOutputs[]> {

        let users = await this.UsersRepo.getAll()
        let usersAndUserOutputs = users.map(async (user): Promise<UsersWithUserOutputs> => {
            let userOutputs = await this.UserOutputRepo.getAllByUserID(user.id)
            return [user, userOutputs]
        })

        return await Promise.all(usersAndUserOutputs)
    }
    async getByUsername(username: string): Promise<UsersWithUserOutputs> {
        let user = await this.UsersRepo.getByUsername(username)
        let userOutputs = await this.UserOutputRepo.getAllByUserID(user.id)
        return [user, userOutputs]
    }
    async updateByUsername(username: string, userData: Partial<Omit<usersModel, "id">>, acessOutputData: number[] = userOutputsDefaults): Promise<UsersWithUserOutputs> {
        let user = await this.UsersRepo.updateByUsername(username, userData)
        await this.UserOutputRepo.deleteManyByUserID(user.id)
        let userOutputsToCreate = acessOutputData.map((accessOutputID) => ({ access_output_id: accessOutputID }))
        let userOutputs = await this.UserOutputRepo.createMany(user.id, userOutputsToCreate)
        return [user, userOutputs]
    }
    async deleteByUsername(username: string) {
        let user = await this.UsersRepo.getByUsername(username)
        await this.UsersRepo.deleteByUsername(username)
        await this.UserOutputRepo.deleteManyByUserID(user.id)
        return
    }



}