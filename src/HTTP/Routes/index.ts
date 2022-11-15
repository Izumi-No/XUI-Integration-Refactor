import { Router } from 'express';

import { planRouter } from './plan.routes';
import { userRouter } from './user.routes';
const router = Router();

router.use('/users', userRouter);
router.use('/plans', planRouter);

export { router };
