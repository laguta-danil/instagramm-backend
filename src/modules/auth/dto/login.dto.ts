import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description:
      'Unique login of the user (3-10 characters). Allowed characters: letters, numbers, underscores, and hyphens',
    example: 'user',
    maxLength: 30,
    minLength: 3,
    pattern: '[a-zA-Z0-9_-]*$',
    uniqueItems: true
  })
  readonly login: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123',
    minLength: 6
  })
  readonly password: string;
}
