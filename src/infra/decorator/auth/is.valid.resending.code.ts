import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { UsersRepo } from '../../../modules/user/repositories/user.repo';

@ValidatorConstraint({ async: true })
export class IsValidResendingCode implements ValidatorConstraintInterface {
  constructor(private usersRepo: UsersRepo) {}

  async validate(value: string) {
    const emailInfo = await this.usersRepo.getConfirmEmailInfoByEmail(value);

    if (!emailInfo) {
      return false;
    }

    if (emailInfo.isConfirmed === true) {
      return false;
    } // user has already been verified

    if (emailInfo.expirationDate < new Date()) {
      return false;
    } // invalid expirationDate

    return true;
  }

  defaultMessage() {
    return 'Incorrect value';
  }
}
