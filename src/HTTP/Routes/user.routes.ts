import { expressRouteAdapter } from '~/Adapters/expressRoute.adapter';
import * as controllerFactories from '~/Factories/Controllers/Users';
import { Router } from 'express';

const userRouter = Router();
userRouter.post(
  '/',
  expressRouteAdapter(controllerFactories.CreateUserControllerFactory())
);
userRouter.get(
  '/',
  expressRouteAdapter(controllerFactories.ListUserControllerFactory())
);
userRouter.get(
  '/:username',
  expressRouteAdapter(controllerFactories.GetOneUserControllerFactory())
);
userRouter.patch(
  '/:paramsUsername',
  expressRouteAdapter(controllerFactories.UpdateUserControllerFactory())
);
userRouter.post(
  '/renew/:username',
  expressRouteAdapter(controllerFactories.RenewUserControllerFactory())
);
userRouter.delete(
  '/:username',
  expressRouteAdapter(controllerFactories.DeleteUserControllerFactory())
);

export { userRouter };
