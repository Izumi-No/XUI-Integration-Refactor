import { adaptMiddleware } from '~/Adapters/expressMiddleware.adapters';
import { expressRouteAdapter } from '~/Adapters/expressRoute.adapter';
import * as controllerFactories from '~/Factories/Controllers/Plans';
import { AuthMiddlewareFactory } from '~/Factories/Middleware/AuthMiddlewareFactory';
import { Router } from 'express';

const planRouter = Router();
planRouter.use(adaptMiddleware(AuthMiddlewareFactory()));
planRouter.get(
  '/',
  expressRouteAdapter(controllerFactories.ListPlansControllerFactory())
);
planRouter.get(
  '/debit/:plano',
  expressRouteAdapter(controllerFactories.DebitPlanControllerFactory())
);

export { planRouter };
