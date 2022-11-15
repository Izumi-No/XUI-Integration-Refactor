import { users } from "@prisma/client";
import { PrismaClient } from "../Connections/Prisma/client";
import { IUsersRepository } from "../Interfaces/IUsersRepository";

export class UsersRepository implements IUsersRepository{
    async create(data: Omit<users, "id">): Promise<users> {
        return await PrismaClient.users.create({data})
    }
    async getAll(): Promise<users[]> {
        return await PrismaClient.users.findMany()
    }
    async getByID(id: number): Promise<users> {
       return await PrismaClient.users.findUniqueOrThrow({where:{id}})
    }
    async deleteByID(id: number): Promise<void> {
        await PrismaClient.users.delete({where:{id}})
        return 
    }
    async updateByID(id: number, data: Partial<Omit<users, "id">>): Promise<users> {
        return await PrismaClient.users.update({data, where:{id}})
    }
    async getByUsername(username: string): Promise<users> {
        return await PrismaClient.users.findFirstOrThrow({where:{username}})
    }
    async deleteByUsername(username: string): Promise<void> {
        let {id} = await this.getByUsername(username)
        return await this.deleteByID(id)
    }
    async updateByUsername(username: string,data: Partial<Omit<users, "id">>): Promise<users> {
                         let {id} = await this.getByUsername(username)

        return await this.updateByID(id, data)
    }
    async verifyUsername(username: string):Promise<boolean>{
        const [user] = await PrismaClient.users.findMany({
            where: {
                username
            }})
        return !!user
    }
    
}