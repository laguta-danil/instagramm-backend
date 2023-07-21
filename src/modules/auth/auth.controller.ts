import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../user/dto/create.dto';

import { ApiRegistration } from './auth.swagger';
import { RegisterCommand } from './use-case/registration.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiRegistration()
  registration(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new RegisterCommand(dto));
  }
}
