import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { RegisterUseCase } from './use-case/registration.use-case';

@Module({
  controllers: [AuthController],
  providers: [
    // service
    JwtService,
    // use-case
    RegisterUseCase
  ]
})
export class AuthModule {}
