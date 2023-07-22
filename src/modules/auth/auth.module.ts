import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { PrismaService } from '../../database/prisma.service';
import { IsValidConfirmCode } from '../../infra/decorator/auth/is.valid.confirm.code';
import { ExistUserByLoginOrEmail } from '../../infra/decorator/user/exist.user.by.login-email';
import { UsersRepo } from '../user/repositories/user.repo';

import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { ConfirmRegisterUseCase } from './use-case/confirm.register.use-case';
import { RegisterUseCase } from './use-case/registration.use-case';

@Module({
  controllers: [AuthController],
  imports: [EventEmitterModule.forRoot(), CqrsModule],
  providers: [
    // service
    PrismaService,
    JwtService,
    UsersRepo,
    // use-case
    RegisterUseCase,
    ConfirmRegisterUseCase,
    // validation
    ExistUserByLoginOrEmail,
    IsValidConfirmCode
  ]
})
export class AuthModule {}
