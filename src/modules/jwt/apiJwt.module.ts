import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApiJwtService } from './apiJwt.services';

@Module({
  exports: [ApiJwtService],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'fdsfdsf',
        signOptions: { expiresIn: '1h' }
      })
    })
  ],
  providers: [ApiJwtService]
})
export class ApiJwtModule {}
