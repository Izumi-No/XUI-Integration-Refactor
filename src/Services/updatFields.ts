import { users as usersModel } from '.prisma/client';

export interface updatFields
  extends Partial<Omit<usersModel, 'id' | 'max_connections'>> {
  plano?: number;
}
