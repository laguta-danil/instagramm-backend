import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, Validate } from 'class-validator';

import { IsValidResendingCode } from '../../../infra/decorator/auth/is.valid.resending.code';
import { Trim } from '../../../infra/decorator/validation/trim';

export class ResendingDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@gmail.com',
    pattern:
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|.(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
    uniqueItems: true
  })
  @Validate(IsValidResendingCode)
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  @IsEmail()
  @Trim()
  @IsString()
  readonly email: string;
}

export class ResendingDbDto {
  readonly email: string;
  readonly newCode: string;
  readonly newExpDate: string;
}
