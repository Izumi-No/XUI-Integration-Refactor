import * as controllerFactories from "~/Factories/Controllers/Users"

import { Router } from "express";
import { expressRouteAdapter } from "~/Adapters/expressRoute.adapter";
import { adaptMiddleware } from "~/Adapters/expressMiddleware.adapters";
import { AuthMiddlewareFactory } from "~/Factories/Middleware/AuthMiddlewareFactory";


const userRouter = Router()
userRouter.use(adaptMiddleware(AuthMiddlewareFactory()))
userRouter.post("/", expressRouteAdapter(controllerFactories.CreateUserControllerFactory()))
userRouter.get("/", expressRouteAdapter(controllerFactories.ListUserControllerFactory()))
userRouter.get("/:username", expressRouteAdapter(controllerFactories.GetOneUserControllerFactory()))
userRouter.patch("/:paramsUsername", expressRouteAdapter(controllerFactories.UpdateUserControllerFactory()))
userRouter.delete("/:username", expressRouteAdapter(controllerFactories.DeleteUserControllerFactory()))


export { userRouter }