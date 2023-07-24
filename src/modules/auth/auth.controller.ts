import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../infra/guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/create.dto';

import { AuthService } from './auth.service';
import {
  ApiAuthorization,
  ApiConfirmRegistration,
  ApiNewPassword,
  ApiPasswordRecovery,
  ApiRegistration,
  ApiResendingRegistration
} from './auth.swagger';
import { ConfirmRegisterDto } from './dto/confirm.register.dto';
import { ResendingDto } from './dto/email.resending.dto';
import { NewPasswordDto } from './dto/new.password.dto';
import { PasswordRecoveryDto } from './dto/password.recovery.dto';
import { ConfirmRegisterCommand } from './use-case/confirm.register.use-case';
import { NewPasswordCommand } from './use-case/new.password.use-case';
import { PasswordRecoveryCommand } from './use-case/password.recovery.use-case';
import { RegisterCommand } from './use-case/registration.use-case';
import { ResendingCommand } from './use-case/resending.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService
  ) {}

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
  @ApiResendingRegistration()
  emailResending(@Body() dto: ResendingDto) {
    return this.commandBus.execute(new ResendingCommand(dto.email));
  }

  @Post('/password-recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiPasswordRecovery()
  recoveryPassword(@Body() dto: PasswordRecoveryDto) {
    return this.commandBus.execute(new PasswordRecoveryCommand(dto.email));
  }

  @Post('/new-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNewPassword()
  newPassword(@Body() dto: NewPasswordDto) {
    return this.commandBus.execute(new NewPasswordCommand(dto));
  }

  @Post('/login')
  @ApiAuthorization()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(@Req() req, @Res() res) {
    const cookie = await this.authService.getCookieWithJwtToken(req.user.id);

    res.cookie('Authorization', cookie, { httpOnly: true });

    return res.json({ cookie: cookie, status: 'Success' });
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req, @Res() res) {
    res.cookie('Authorization', null, { httpOnly: true });

    return res.sendStatus(200);
  }
}
