import { users as usersModel } from '@prisma/client';
import { fail, HttpResponse, ok } from '~/Helpers/HTTPResponseHelpers';
import { UserService } from '~/Services/User.service';

import { Controller } from '../BaseController';

interface UpdateUserControllerRequest extends Partial<usersModel> {
  paramsUsername: string;
  userOutputs?: number[];
}

export class UpdateUserController implements Controller {
  constructor(private userService: UserService) {}

  async handle({
    paramsUsername,
    userOutputs,
    ...data
  }: UpdateUserControllerRequest): Promise<HttpResponse> {
    try {
      return ok(
        await this.userService.updateByUsername(
          paramsUsername,
          data,
          userOutputs
        )
      );
    } catch (e) {
      return fail(e);
    }
  }
}
