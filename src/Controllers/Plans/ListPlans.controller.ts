import { ok } from '~/Helpers/HTTPResponseHelpers';
import { PlanService } from '~/Services/Plans.service';

import { Controller } from '../BaseController';

export class ListPlansController implements Controller {
  constructor(private PlansService: PlanService) {}

  async handle() {
    return ok(await this.PlansService.listAll());
  }
}
