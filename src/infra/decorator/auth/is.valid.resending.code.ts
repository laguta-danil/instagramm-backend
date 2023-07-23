import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { AuthService } from '../../../modules/auth/auth.service';
import { UsersRepo } from '../../../modules/user/repositories/user.repo';

@ValidatorConstraint({ async: true })
export class IsValidResendingCode implements ValidatorConstraintInterface {
  constructor(private usersRepo: UsersRepo, private authService: AuthService) {}

  async validate(value: string) {
    const emailInfo = await this.usersRepo.getConfirmEmailInfoByEmail(value);

    return this.authService.checkAuthCode(emailInfo);
  }

  defaultMessage() {
    return 'Incorrect value';
  }
}
