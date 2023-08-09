import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { Trim } from '../../../infra/decorator/validation/trim';

export class PasswordRecoveryDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@gmail.com',
    pattern:
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|.(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
    uniqueItems: true
  })
  @IsEmail()
  @Trim()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'recaptcha value' })
  @Trim()
  @IsString()
  readonly recaptchaValue: string;
}

export class PasswordRecoveryDbDto {
  readonly userId: string;
  readonly recoveryCode: string;
  readonly expirationDate: string;
}
