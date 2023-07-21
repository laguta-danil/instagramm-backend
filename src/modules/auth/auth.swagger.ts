import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { apiBadRequestResponse } from '../../utils/swagger/api.error.response';
import { CreateUserDto } from '../user/dto/create.dto';

export function ApiRegistration() {
  return applyDecorators(
    ApiOperation({ summary: 'Registration user' }),
    ApiBody({ type: CreateUserDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Send registration email with code to user',
      status: HttpStatus.NO_CONTENT
    })
  );
}
