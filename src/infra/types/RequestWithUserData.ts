import { Request } from 'express';

export interface IUser {
  id: string;
  username: string;
  refreshToken?: string | boolean;
}

export class RequestWithUserData extends Request {
  user: IUser;
}
