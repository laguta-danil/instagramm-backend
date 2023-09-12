import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { apiBadRequestResponse } from '../../utils/swagger/api.error.response';
import { CreateUserDto } from '../user/dto/create.dto';

import { ConfirmRegisterDto } from './dto/confirm.register.dto';
import { ResendingDto } from './dto/email.resending.dto';
import { LoginDto } from './dto/login.dto';
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
    ApiOperation({ summary: 'Password recovery with Recaptcha' }),
    ApiBody({ type: PasswordRecoveryDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({ description: 'Forbidden', status: HttpStatus.FORBIDDEN }),
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

export function ApiAuthorization() {
  return applyDecorators(
    ApiOperation({ summary: 'Authorization' }),
    ApiBody({ type: LoginDto }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Token send',
      status: HttpStatus.OK
    })
  );
}

export function ApiUpdateUserProfile() {
  return applyDecorators(
    ApiOperation({ summary: 'Update user profile' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        properties: {
          aboutMe: { example: 'AboutMe', type: 'string' },
          birthdayDate: { example: '2012-04-23T18:25:43.511Z', type: 'string' },
          city: { example: 'Washington', type: 'string' },
          file: {
            format: 'binary',
            type: 'string'
          },
          firstName: { example: 'Vasilii', type: 'string' },
          lastName: { example: 'Churilov', type: 'string' }
        },
        type: 'object'
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Profile updated',
      status: HttpStatus.OK
    })
  );
}

export function ApiDeleteUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete user!!!' }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'User deleted',
      status: HttpStatus.OK
    })
  );
}

export function ApiGetUserProfile() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user profilez' }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'User profile sent',
      status: HttpStatus.NO_CONTENT
    })
  );
}

export function ApiGetPost() {
  return applyDecorators(
    ApiOperation({ summary: "Get user's post by id" }),
    ApiBody({
      schema: {
        properties: {
          id: {
            example: '30cad7d0-2539-475b-bcf0-79e957a09863',
            type: 'string'
          }
        }
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post send',
      status: HttpStatus.OK
    })
  );
}

export function ApiGetPosts() {
  return applyDecorators(
    ApiOperation({ summary: "Get all user's posts" }),
    ApiResponse({
      description: "User's posts send",
      status: HttpStatus.OK
    })
  );
}

export function ApiUpdatePost() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Update Post (For multiply upload test this endpoint in Postman, because swagger can not upload more then one file)'
    }),
    ApiBody({
      schema: {
        properties: {
          description: { example: 'Some description', type: 'string' },
          files: {
            format: 'binary',
            type: 'string'
          },
          id: {
            example: '72f5b68e-6843-4cb3-b119-05e6a75d1b3f',
            type: 'string'
          }
        },
        type: 'object'
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post updated',
      status: HttpStatus.OK
    })
  );
}

export function ApiDeletePost() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete post by id' }),
    ApiBody({
      schema: {
        properties: {
          id: {
            example: '30cad7d0-2539-475b-bcf0-79e957a09863',
            type: 'string'
          }
        }
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post deleted',
      status: HttpStatus.OK
    })
  );
}

export function ApiCreatePost() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Create new Post (For multiply upload test this endpoint in Postman, because swagger can not upload more then one file)'
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        properties: {
          description: { example: 'Some description', type: 'string' },
          files: {
            format: 'binary',
            type: 'string'
          }
        },
        type: 'object'
      }
    }),
    ApiBadRequestResponse(apiBadRequestResponse),
    ApiResponse({
      description: 'Post uploaded',
      status: HttpStatus.OK
    })
  );
}
