import { Router } from "express"
import { userRouter } from "./user.routes"
import { planRouter } from "./plan.routes"
const router = Router()

router.use("/users", userRouter)
router.use("/plans", planRouter)


export { router }