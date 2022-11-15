import { users, user_output } from '@prisma/client';

export type UsersWithUserOutputs = [users, user_output[]];
