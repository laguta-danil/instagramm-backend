import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { AuthService } from '../../../modules/auth/auth.service';
import { UsersRepo } from '../../../modules/user/repositories/user.repo';

@ValidatorConstraint({ async: true })
export class IsValidRecoveryCode implements ValidatorConstraintInterface {
  constructor(private usersRepo: UsersRepo, private authService: AuthService) {}

  async validate(value: string) {
    const recoveryPassInfo = await this.usersRepo.getRecoveryPassInfoByCode(
      value
    );

    return this.authService.checkAuthCode(recoveryPassInfo);
  }

  defaultMessage() {
    return 'Incorrect code';
  }
}
