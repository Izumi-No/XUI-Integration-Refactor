import { users } from '@prisma/client';

export interface userRequiredFields
  extends Pick<users, 'username' | 'password'> {
  plano: number;
}
