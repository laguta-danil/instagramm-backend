import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { apiBadRequestResponse } from '../../utils/swagger/api.error.response';
import { CreateUserDto } from '../user/dto/create.dto';

import { RegisterCommand } from './use-case/registration.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Registration user' })
  @ApiBody({ type: CreateUserDto })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiResponse({
    description: 'Send registration email with code to user',
    status: HttpStatus.NO_CONTENT
  })
  registration(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new RegisterCommand(dto));
  }
}
