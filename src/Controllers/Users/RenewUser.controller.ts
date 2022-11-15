import { users as usersModel } from '@prisma/client';
import { fail, HttpResponse, ok } from '~/Helpers/HTTPResponseHelpers';
import { UserService } from '~/Services/User.service';

import { Controller } from '../BaseController';

interface RenewUserControllerRequest extends Partial<usersModel> {
  username: string;
  plano: number;
}

export class RenewUserController implements Controller {
  constructor(private userService: UserService) {}

  async handle({
    username,
    plano
  }: RenewUserControllerRequest): Promise<HttpResponse> {
    try {
      return ok(await this.userService.renewByUsername(username, plano));
    } catch (e) {
      return fail(e);
    }
  }
}
