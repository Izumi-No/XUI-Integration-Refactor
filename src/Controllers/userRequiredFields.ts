import { users } from "@prisma/client"


export type userRequiredFields = Pick<users, "bouquet" | "username" | "password" | "max_connections" | "enabled" | "is_trial" | "exp_date">