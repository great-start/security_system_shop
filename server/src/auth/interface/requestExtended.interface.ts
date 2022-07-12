import { User } from '@prisma/client';

export interface IRequestExtended extends Request {
  user: User;
}
