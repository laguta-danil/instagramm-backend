import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '../../database/prisma.service';
import { IsValidConfirmCode } from '../../infra/decorator/auth/is.valid.confirm.code';
import { IsValidResendingCode } from '../../infra/decorator/auth/is.valid.resending.code';
import { ExistUserByLoginOrEmail } from '../../infra/decorator/user/exist.user.by.login-email';
import { JwtStrategy } from '../../infra/strategis/jwt.strategy';
import { LocalStrategy } from '../../infra/strategis/local.strategy';
import { ApiJwtModule } from '../jwt/apiJwt.module';
import { EmailService } from '../email/email.service';
import { UsersRepo } from '../user/repositories/user.repo';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfirmRegisterUseCase } from './use-case/confirm.register.use-case';
import { AuthStatusUseCase } from './use-case/authStatus.use-case';
import { RegisterUseCase } from './use-case/registration.use-case';
import { ResendingUseCase } from './use-case/resending.use-case';

@Module({
  controllers: [AuthController],
  imports: [
    EventEmitterModule.forRoot(),
    CqrsModule,
    PassportModule,
    ApiJwtModule
  ],
  providers: [
    // service
    PrismaService,
    EmailService,
    JwtService,
    AuthService,
    UsersRepo,
    // use-case
    RegisterUseCase,
    ConfirmRegisterUseCase,
    ResendingUseCase,
    AuthStatusUseCase,
    // validation
    ExistUserByLoginOrEmail,
    IsValidConfirmCode,
    IsValidResendingCode,
    // guards
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
