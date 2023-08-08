import { Request } from 'express';

export class RequserWithUser extends Request {
  user: {
    id: string;
  };
}
