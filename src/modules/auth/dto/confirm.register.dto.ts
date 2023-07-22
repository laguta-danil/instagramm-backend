import { IsString, IsUUID, Validate } from 'class-validator';

import { IsValidConfirmCode } from '../../../infra/decorator/auth/is.valid.confirm.code';
import { Trim } from '../../../infra/decorator/validation/trim';

export class ConfirmRegisterDto {
  @Validate(IsValidConfirmCode)
  @IsUUID()
  @Trim()
  @IsString()
  readonly code: string;
}
