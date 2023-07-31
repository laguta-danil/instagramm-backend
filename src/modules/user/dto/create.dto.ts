import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Validate
} from 'class-validator';

import { ExistUserByLoginOrEmail } from '../../../infra/decorator/user/exist.user.by.login-email';
import { Trim } from '../../../infra/decorator/validation/trim';

export class UserDto {
  @ApiProperty({
    description:
      'Unique login of the user (6-30 characters). Allowed characters: letters, numbers, underscores, and hyphens',
    example: 'user',
    maxLength: 30,
    minLength: 6,
    pattern: '[a-zA-Z0-9_-]*$',
    uniqueItems: true
  })
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(3, 30)
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
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  @IsEmail()
  @Trim()
  @IsString()
  readonly email: string;
}

export class CreateUserDto extends UserDto {
  @Validate(ExistUserByLoginOrEmail)
  readonly login: string;

  @Validate(ExistUserByLoginOrEmail)
  readonly email: string;
}

export class CreateUserServiceDto extends CreateUserDto {}

export class CreateUserDbDto {
  readonly email: string;
  readonly login: string;
  readonly passwordHash: string;
}

export class UpdateUserProfileDto {
  @ApiProperty({
    description: 'User id',
    example: 'f84b6b33-72f8-4240-a073-0b061f860175'
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Firstname',
    example: 'Ivan'
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Ivanov'
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Lastname',
    example: '2022-04-23T10:25:43.511Z'
  })
  @IsString()
  birthdayDate: string;

  @ApiProperty({
    description: 'City Name',
    example: 'New york'
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'About me',
    example: 'About me'
  })
  @IsString()
  aboutMe: string;

  @IsOptional()
  @IsUrl()
  photo?: string;
}
