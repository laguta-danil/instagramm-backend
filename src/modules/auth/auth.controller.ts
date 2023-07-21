import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserDto } from '../user/dto/create.dto';

import { RegisterCommand } from './use-case/registration.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  registration(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new RegisterCommand(dto));
  }
}
