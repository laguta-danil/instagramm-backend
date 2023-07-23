import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { UsersRepo } from '../../../modules/user/repositories/user.repo';

@ValidatorConstraint({ async: true })
export class IsValidRecoveryCode implements ValidatorConstraintInterface {
  constructor(private usersRepo: UsersRepo) {}

  async validate(value: string) {
    const recoveryPassInfo = await this.usersRepo.getRecoveryPassInfoByCode(
      value
    );

    if (!recoveryPassInfo) {
      return false;
    }

    if (recoveryPassInfo.isConfirmed) {
      return false;
    }

    if (recoveryPassInfo.expirationDate < new Date()) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Incorrect code';
  }
}
