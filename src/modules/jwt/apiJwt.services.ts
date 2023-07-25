import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EnvEnum } from '../../utils/env.enum';

const { JWT_REFRESH_TOKEN_EXPIRATION_TIME, JWT_REFRESH_TOKEN_SECRET } = EnvEnum;

@Injectable()
export class ApiJwtService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async createJWT(id) {
    const secretRT = this.configService.get<string>(JWT_REFRESH_TOKEN_SECRET);
    const expiresInRT = this.configService.get<string>(
      JWT_REFRESH_TOKEN_EXPIRATION_TIME
    );

    const accessToken = this.jwtService.sign({ id });
    const refreshToken = this.jwtService.sign(
      { userId: id },
      { expiresIn: expiresInRT, secret: secretRT }
    );

    return { accessToken, refreshToken };
  }

  async getNewAccessToken(id: string, refreshToken: string) {
    const accessToken = this.jwtService.sign({ id });

    return { accessToken, refreshToken };
  }
}
