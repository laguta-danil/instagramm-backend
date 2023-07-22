import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../user/dto/create.dto';

import { ApiConfirmRegistration, ApiRegistration } from './auth.swagger';
import { ConfirmRegisterDto } from './dto/confirm.register.dto';
import { EmailResendingDto } from './dto/email.resending.dto';
import { ConfirmRegisterCommand } from './use-case/confirm.register.use-case';
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

  @Post('/registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConfirmRegistration()
  confirmRegister(@Body() dto: ConfirmRegisterDto) {
    return this.commandBus.execute(new ConfirmRegisterCommand(dto.code));
  }

  @Post('/registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  emailResending(@Body() dto: EmailResendingDto) {
    return dto;
  }
}
