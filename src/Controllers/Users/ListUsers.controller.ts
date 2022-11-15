import { HttpResponse, ok } from "~/Helpers/HTTPResponseHelpers"
import { UserService } from "~/Services/User.service"
import { Controller } from "../BaseController"



export class ListUserController implements Controller{
    constructor(private userService: UserService){
        
    }
    async handle(): Promise<HttpResponse>{
            return ok(await this.userService.list())
    }
}