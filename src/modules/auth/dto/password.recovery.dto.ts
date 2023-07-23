import { IsEmail, IsString, Matches } from 'class-validator';

import { Trim } from '../../../infra/decorator/validation/trim';

export class PasswordRecoveryDto {
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  @IsEmail()
  @Trim()
  @IsString()
  readonly email: string;
}

export class PasswordRecoveryDbDto {
  readonly userId: string;
  readonly recoveryCode: string;
  readonly expirationDate: string;
}