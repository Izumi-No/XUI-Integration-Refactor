import * as controllerFactories from "~/Factories/Controllers/Plans"

import { Router } from "express";
import { expressRouteAdapter } from "~/Adapters/expressRoute.adapter";
import { adaptMiddleware } from "~/Adapters/expressMiddleware.adapters";
import { AuthMiddlewareFactory } from "~/Factories/Middleware/AuthMiddlewareFactory";


const planRouter = Router()
planRouter.use(adaptMiddleware(AuthMiddlewareFactory()))
planRouter.get("/", expressRouteAdapter(controllerFactories.ListPlansControllerFactory()))
planRouter.get("/debit/:plano", expressRouteAdapter(controllerFactories.DebitPlanControllerFactory()))


export { planRouter }