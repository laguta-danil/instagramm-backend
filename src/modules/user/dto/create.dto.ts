import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, Validate } from 'class-validator';

import { ExistUserByLoginOrEmail } from '../../../infra/decorator/user/exist.user.by.login-email';
import { Trim } from '../../../infra/decorator/validation/trim';

export class CreateUserDto {
  @ApiProperty({
    description:
      'Unique login of the user (6-30 characters). Allowed characters: letters, numbers, underscores, and hyphens',
    example: 'user',
    maxLength: 30,
    minLength: 6,
    pattern: '[a-zA-Z0-9_-]*$',
    uniqueItems: true
  })
  @Validate(ExistUserByLoginOrEmail)
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(6, 30)
  @Trim()
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123',
    maxLength: 20,
    minLength: 6
  })
  @Length(6, 20)
  @Trim()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@gmail.com',
    pattern:
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|.(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
    uniqueItems: true
  })
  @Validate(ExistUserByLoginOrEmail)
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  @IsEmail()
  @Trim()
  @IsString()
  readonly email: string;
}

export class CreateUserServiceDto extends CreateUserDto {}

export class CreateUserDbDto {
  readonly email: string;
  readonly login: string;
  readonly passwordHash: string;
}
