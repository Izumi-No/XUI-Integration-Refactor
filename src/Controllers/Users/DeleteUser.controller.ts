import { fail, HttpResponse, ok } from "~/Helpers/HTTPResponseHelpers"
import { UserService } from "~/Services/User.service"
import { Controller } from "../BaseController"

type DeleteUserControllerRequest = {
    username: string
}

export class DeleteUserController implements Controller {
    constructor(private userService: UserService) {

    }
    async handle({ username }: DeleteUserControllerRequest): Promise<HttpResponse> {
        try { return ok(await this.userService.deleteByUsername(username)) }
        catch (e) {
            return fail(e)
        }
    }
}