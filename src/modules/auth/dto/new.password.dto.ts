import { IsString, IsUUID, Length, Validate } from 'class-validator';

import { IsValidRecoveryCode } from '../../../infra/decorator/auth/is.valid.recovery.code';
import { Trim } from '../../../infra/decorator/validation/trim';

export class NewPasswordDto {
  @Length(6, 20)
  @Trim()
  @IsString()
  readonly newPassword: string;

  @Validate(IsValidRecoveryCode)
  @IsUUID()
  @Trim()
  @IsString()
  readonly recoveryCode: string;
}

export class NewPasswordServiceDto {
  readonly newPassword: string;
  readonly recoveryCode: string;
}

export class NewPasswordDbDto {
  readonly newPasswordHash: string;
  readonly recoveryCode: string;
}
