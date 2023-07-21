import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { RegisterCommand } from './use-case/registration.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  registration() {
    return this.commandBus.execute(new RegisterCommand());
  }
}
