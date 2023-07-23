import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { apiBadRequestResponse } from '../../utils/swagger/api.error.response';
import { CreateUserDto } from '../user/dto/create.dto';

import { ConfirmRegisterDto } from './dto/confirm.register.dto';
import { ResendingDto } from './dto/email.resending.dto';
import { NewPasswordDto } from './dto/new.password.dto';
import { PasswordRecoveryDto } from './dto/password.recovery.dto';

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

export function ApiConfirmRegistration() {
  return applyDecorators(
    ApiOperation({ summary: 'Confirm registration' }),
    ApiBody({ type: ConfirmRegisterDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Success registration',
      status: HttpStatus.NO_CONTENT
    })
  );
}

export function ApiResendingRegistration() {
  return applyDecorators(
    ApiOperation({ summary: 'Resending registration' }),
    ApiBody({ type: ResendingDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Send resending registration email with code to user',
      status: HttpStatus.NO_CONTENT
    })
  );
}

export function ApiPasswordRecovery() {
  return applyDecorators(
    ApiOperation({ summary: 'Password recovery' }),
    ApiBody({ type: PasswordRecoveryDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Send recovery email with code to user',
      status: HttpStatus.NO_CONTENT
    })
  );
}

export function ApiNewPassword() {
  return applyDecorators(
    ApiOperation({ summary: 'New password' }),
    ApiBody({ type: NewPasswordDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Success change password by user',
      status: HttpStatus.NO_CONTENT
    })
  );
}
