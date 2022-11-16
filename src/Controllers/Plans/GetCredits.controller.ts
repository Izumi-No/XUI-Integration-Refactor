import { fail, ok } from '~/Helpers/HTTPResponseHelpers';
import { PlanService } from '~/Services/Plans.service';

import { Controller } from '../BaseController';

export class GetCreditsController implements Controller {
  constructor(private PlansService: PlanService) {}

  async handle() {
    try {
      const credits = await this.PlansService.getCredits();
      return ok({
        credits
      });
    } catch (e) {
      return fail(e);
    }
  }
}
