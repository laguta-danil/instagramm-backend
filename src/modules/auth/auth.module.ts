import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '../../database/prisma.service';
import { IsValidConfirmCode } from '../../infra/decorator/auth/is.valid.confirm.code';
import { IsValidRecoveryCode } from '../../infra/decorator/auth/is.valid.recovery.code';
import { IsValidResendingCode } from '../../infra/decorator/auth/is.valid.resending.code';
import { ExistUserByLoginOrEmail } from '../../infra/decorator/user/exist.user.by.login-email';
import { RefreshTokenStrategy } from '../../infra/strategis/jwt-refresh.strategy';
import { JwtStrategy } from '../../infra/strategis/jwt.strategy';
import { LocalStrategy } from '../../infra/strategis/local.strategy';
import { EmailService } from '../email/email.service';
import { ApiJwtModule } from '../jwt/apiJwt.module';
import { UsersRepo } from '../user/repositories/user.repo';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfirmRegisterUseCase } from './use-case/confirm.register.use-case';
import { NewPasswordUseCase } from './use-case/new.password.use-case';
import { PasswordRecoveryUseCase } from './use-case/password.recovery.use-case';
import { RegisterUseCase } from './use-case/registration.use-case';
import { ResendingUseCase } from './use-case/resending.use-case';

@Module({
  controllers: [AuthController],
  imports: [
    EventEmitterModule.forRoot(),
    CqrsModule,
    PassportModule,
    ApiJwtModule,
    HttpModule
  ],
  providers: [
    // service
    PrismaService,
    JwtService,
    EmailService,
    AuthService,
    UsersRepo,
    // use-case
    RegisterUseCase,
    ConfirmRegisterUseCase,
    ResendingUseCase,
    PasswordRecoveryUseCase,
    NewPasswordUseCase,
    // validation
    ExistUserByLoginOrEmail,
    IsValidConfirmCode,
    IsValidResendingCode,
    IsValidRecoveryCode,
    // guards
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy
  ]
})
export class AuthModule {}
