import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Validate } from 'class-validator';

import { IsValidConfirmCode } from '../../../infra/decorator/auth/is.valid.confirm.code';
import { Trim } from '../../../infra/decorator/validation/trim';

export class ConfirmRegisterDto {
  @ApiProperty({ description: 'Confirm code from email, must be uuid' })
  @Validate(IsValidConfirmCode)
  @IsUUID()
  @Trim()
  @IsString()
  readonly code: string;
}
