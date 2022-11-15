import { user_output } from "@prisma/client";
import { PrismaClient } from "../Connections/Prisma/client";
import { IUserOutputRepository } from "../Interfaces/IUserOutputRepository";

export class UserOutputRepository implements IUserOutputRepository {

    async createMany(user_id: number, data: Omit<user_output, "id" | "user_id">[]) {

        let completeData = data.map(function(partialData){
                return { ...partialData, user_id }
            })

        await PrismaClient.user_output.createMany({ data: completeData })

        return await this.getAllByUserID(user_id)
    }
    async getAllByUserID(user_id: number): Promise<user_output[]> {
        return await PrismaClient.user_output.findMany({ where: { user_id } })
    }
    async deleteManyByUserID(user_id: number): Promise<void> {
        await PrismaClient.user_output.deleteMany({ where: { user_id } })
        return
    }


}