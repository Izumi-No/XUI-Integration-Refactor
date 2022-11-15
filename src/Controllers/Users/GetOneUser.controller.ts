import { fail, HttpResponse, ok } from "~/Helpers/HTTPResponseHelpers"
import { UserService } from "~/Services/User.service"
import { Controller } from "../BaseController"



export class GetOneUserController implements Controller{
    constructor(private userService: UserService){
        
    }
    async handle({username}: {username: string}): Promise<HttpResponse>{
        try{
            return ok(await this.userService.getByUsername(username))
        }catch(e){
            return fail(e)
        }
    }
}