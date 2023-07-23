import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length, Validate } from 'class-validator';

import { IsValidRecoveryCode } from '../../../infra/decorator/auth/is.valid.recovery.code';
import { Trim } from '../../../infra/decorator/validation/trim';

export class NewPasswordDto {
  @ApiProperty({
    description: 'New user password',
    example: 'qwerty123',
    maxLength: 20,
    minLength: 6
  })
  @Length(6, 20)
  @Trim()
  @IsString()
  readonly newPassword: string;

  @ApiProperty({ description: 'Recovery code from email, must be uuid' })
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
