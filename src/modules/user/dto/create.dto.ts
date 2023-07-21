import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { UsersRepo } from '../repositories/user.repo';

@ValidatorConstraint({ async: true })
export class ExistUserByLoginOrEmail implements ValidatorConstraintInterface {
  constructor(private readonly usersRepo: UsersRepo) {}

  async validate(value: string) {
    const isAlreadyUser = await this.usersRepo.checkUserByEmailOrLogin(value);

    if (isAlreadyUser) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Incorrect login or email';
  }
}
