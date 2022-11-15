import { fail, ok } from '~/Helpers/HTTPResponseHelpers';
import { PlanService } from '~/Services/Plans.service';

import { Controller } from '../BaseController';

export class DebitPlanController implements Controller {
  constructor(private PlansService: PlanService) {}

  async handle({ plano }: { plano: number }) {
    try {
      return ok(await this.PlansService.debit(plano));
    } catch (e) {
      return fail(e);
    }
  }
}
