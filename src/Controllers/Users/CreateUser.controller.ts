import { HttpResponse, ok, fail } from '~/Helpers/HTTPResponseHelpers';
import { UserService } from '~/Services/User.service';

import { Controller } from '../BaseController';
import { userRequiredFields } from '../userRequiredFields';

export class CreateUserController implements Controller<userRequiredFields> {
  constructor(private userService: UserService) {}

  async handle(data: userRequiredFields): Promise<HttpResponse> {
    try {
      return ok(await this.userService.create(data));
    } catch (e) {
      return fail(e);
    }
  }
}
