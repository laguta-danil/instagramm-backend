import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../../infra/guards/local-auth.guard';
import { RecaptchaGuard } from '../../infra/guards/recaptcha.guard';
import { RefreshAuthGuard } from '../../infra/guards/refresh-auth.guard';
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
  @UseGuards(RecaptchaGuard)
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

  @UseGuards(RefreshAuthGuard)
  @Get('/refresh-token')
  async refreshTokens(@Req() req, @Res({ passthrough: true }) res) {
    const newAuthToken = await this.authService.refreshAccessToken(req);
    res.cookie('Authorization', newAuthToken, { httpOnly: true });
    res
      .status(200)
      .send({ accessToken: newAuthToken.accessToken, message: 'Success' });
  }

  @Post('/login')
  @ApiAuthorization()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(@Req() req, @Res() res) {
    const authToken = await this.authService.login(req.user);
    res.cookie('Authorization', authToken, {
      httpOnly: true
      // sameSite: 'none',
      // secure: true
    });
    res
      .status(200)
      .send({ accessToken: authToken.accessToken, message: 'Success' });
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res() res) {
    res.cookie('Authorization', null, { httpOnly: true });
    res.sendStatus(200);
  }
}
