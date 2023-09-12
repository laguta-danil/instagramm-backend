import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches
} from 'class-validator';

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
  @IsString()
  // @Validate(ExistUserByLoginOrEmail)
  readonly login: string;

  @IsString()
  // @Validate(ExistUserByLoginOrEmail)
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class CreateUserServiceDto extends CreateUserDto {}

export class CreateUserDbDto {
  readonly email: string;
  readonly login: string;
  readonly passwordHash: string;
}

export class UpdateUserProfileDto {
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

  @IsOptional()
  @ApiProperty({
    description: 'Lastname',
    example: '2022-04-23T10:25:43.511Z'
  })
  @IsString()
  birthdayDate?: string;

  @IsOptional()
  @ApiProperty({
    description: 'City Name',
    example: 'New york'
  })
  @IsString()
  city?: string;

  @IsOptional()
  @ApiProperty({
    description: 'About me',
    example: 'About me'
  })
  @IsString()
  aboutMe?: string;

  @IsOptional()
  @IsUrl()
  photo?: string;
}
