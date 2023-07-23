import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { PrismaService } from '../../database/prisma.service';
import { IsValidConfirmCode } from '../../infra/decorator/auth/is.valid.confirm.code';
import { IsValidResendingCode } from '../../infra/decorator/auth/is.valid.resending.code';
import { ExistUserByLoginOrEmail } from '../../infra/decorator/user/exist.user.by.login-email';
import { EmailService } from '../email/email.service';
import { UsersRepo } from '../user/repositories/user.repo';

import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { ConfirmRegisterUseCase } from './use-case/confirm.register.use-case';
import { PasswordRecoveryUseCase } from './use-case/password.recovery.use-case';
import { RegisterUseCase } from './use-case/registration.use-case';
import { ResendingUseCase } from './use-case/resending.use-case';

@Module({
  controllers: [AuthController],
  imports: [EventEmitterModule.forRoot(), CqrsModule],
  providers: [
    // service
    PrismaService,
    JwtService,
    EmailService,
    UsersRepo,
    // use-case
    RegisterUseCase,
    ConfirmRegisterUseCase,
    ResendingUseCase,
    PasswordRecoveryUseCase,
    // validation
    ExistUserByLoginOrEmail,
    IsValidConfirmCode,
    IsValidResendingCode
  ]
})
export class AuthModule {}
