import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EnvEnum } from '../../utils/env.enum';

const { JWT_SECRET, JWT_EXPIRATION_TIME } = EnvEnum;

@Injectable()
export class ApiJwtService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  /**
   * Create JWT tokens
   * @param userId
   * @param deviceId
   */
  async createJWT(id) {
    const secretRT = this.configService.get<string>(JWT_SECRET);
    const expiresInRT = this.configService.get<string>(JWT_EXPIRATION_TIME);

    const accessToken = this.jwtService.sign({ id });
    const refreshToken = this.jwtService.sign(
      { userId: id },
      { expiresIn: expiresInRT, secret: secretRT }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Get data from access token
   * @param refreshToken
   */
  async getRefreshTokenData(refreshToken: string): Promise<any | null> {
    try {
      // const secretRT = this.apiConfigService.REFRESH_TOKEN_SECRET;
      return this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>(JWT_SECRET)
      });
    } catch (e) {
      return null;
    }
  }

  /**
   * Get user id from access token
   * @param accessToken
   */
  async getUserIdByAccessToken(accessToken: string): Promise<number | null> {
    try {
      const result = this.jwtService.verify(accessToken);

      return result.userId;
    } catch (e) {
      return null;
    }
  }
}
