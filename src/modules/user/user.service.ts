import { Injectable } from '@nestjs/common';

import { User } from '../../graphql.schema';

import { UsersRepo } from './repositories/user.repo';

@Injectable()
export class AuthService {
  constructor(private usersRepo: UsersRepo, private users: User) {}

  public async getAllUsers(userId: string) {
    return this.usersRepo.findById(userId);
  }
}
