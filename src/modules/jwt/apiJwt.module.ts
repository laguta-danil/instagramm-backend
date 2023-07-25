import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { EnvEnum } from '../../utils/env.enum';

import { ApiJwtService } from './apiJwt.services';

const { JWT_SECRET, JWT_TOKEN_EXPIRATION_TIME } = EnvEnum;

@Module({
  exports: [ApiJwtService],
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(JWT_TOKEN_EXPIRATION_TIME)
        }
      })
    })
  ],
  providers: [ApiJwtService]
})
export class ApiJwtModule {}
