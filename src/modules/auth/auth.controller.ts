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
import { AuthUserDto, CreateUserDto } from '../user/dto/create.dto';

import { AuthService } from './auth.service';
import {
  ApiAuthorization,
  ApiConfirmRegistration,
  ApiRegistration,
  ApiResendingRegistration
} from './auth.swagger';
import { ConfirmRegisterDto } from './dto/confirm.register.dto';
import { ResendingDto } from './dto/email.resending.dto';
import { ConfirmRegisterCommand } from './use-case/confirm.register.use-case';
import { LoginCommand } from './use-case/authStatus.use-case';
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

  @Post('/login')
  @ApiAuthorization()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(@Req() req, @Res() res) {
    const cookie = this.authService.getCookieWithJwtToken(req.user.id);
    console.log(cookie);
    res.cookie('Authorization', cookie, { httpOnly: true });

    return res.json({ status: 'Success' });
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req, @Res() res) {
    res.cookie('Authorization', null, { httpOnly: true });

    return res.sendStatus(200);
  }
}
