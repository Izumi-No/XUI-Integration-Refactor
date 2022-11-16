import { expressRouteAdapter } from '~/Adapters/expressRoute.adapter';
import * as controllerFactories from '~/Factories/Controllers/Plans';
import { Router } from 'express';

const planRouter = Router();
planRouter.get(
  '/',
  expressRouteAdapter(controllerFactories.ListPlansControllerFactory())
);
planRouter.get(
  '/credits',
  expressRouteAdapter(controllerFactories.DebitPlanControllerFactory())
);

export { planRouter };
