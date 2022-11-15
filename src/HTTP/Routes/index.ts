import { Router } from 'express';
import { adaptMiddleware } from '~/Adapters/expressMiddleware.adapters';
import { AuthMiddlewareFactory } from '~/Factories/Middleware/AuthMiddlewareFactory';

import { planRouter } from './plan.routes';
import { userRouter } from './user.routes';
const router = Router();

router.use(adaptMiddleware(AuthMiddlewareFactory()));

router.use('/users', userRouter);
router.use('/plans', planRouter);

export { router };
