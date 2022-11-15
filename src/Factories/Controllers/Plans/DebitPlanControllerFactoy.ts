import { DebitController } from "~/Controllers/Plans";
import { planos } from "~/Plans";
import { RegUsersRepository } from "~/Repositories/RegUsers.repository";
import { PlanService } from "~/Services/Plans.service";


export function DebitPlanControllerFactory(){
    let RegUsersRepositoryInstance = new RegUsersRepository()
    let PlanServiceInstance = new PlanService(RegUsersRepositoryInstance, planos)
    return new DebitController(PlanServiceInstance)
}