import { users, user_output } from "@prisma/client";
import { UsersWithUserOutputs } from "../DTOs/UsersWithUserOutputs";


export class UsersMapper {
    static toDTO(user: users, user_outputs: user_output[]): UsersWithUserOutputs {
  
        return [user,user_outputs]
    }
   
}