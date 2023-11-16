import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';

import { UsersRepo } from './repositories/user.repo';

@Injectable()
export class UserService {
  constructor(private usersRepo: UsersRepo) {}

  public async getAllUsers(
    page,
    itemsPerPage,
    search,
    sortByCreateDate,
    sortByUserName
  ) {
    const take = +itemsPerPage || 16;
    const skip = (+page - 1) * +itemsPerPage || 0;
    try {
      return this.usersRepo.getAllUsers(
        take,
        skip,
        search || '',
        sortByCreateDate,
        sortByUserName
      );
    } catch (e) {
      throw new UserInputError(e);
    }
  }

  async createUser(user) {
    await user;

    return this.usersRepo.createUser({
      email: 'string',
      login: 'string',
      passwordHash: 'string'
    });
  }

  async getUserById(id) {
    return this.usersRepo.findById(id);
  }

  async getAdminRole(id) {
    const user = await this.getUserById(id);
    user.role = 'Admin';

    return this.usersRepo.updateUserProfile(id, user);
  }
}
