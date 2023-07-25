import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request as RequestType } from 'express';

import { EnvEnum } from '../../utils/env.enum';

const { JWT_REFRESH_TOKEN_SECRET } = EnvEnum;

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(configService: ConfigService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      passReqToCallback: true,
      secretOrKey: configService.get<string>(JWT_REFRESH_TOKEN_SECRET)
    });
  }

  async validate(req: RequestType, payload) {
    const refreshToken = req.cookies.Authorization.refreshToken;

    return { ...payload, refreshToken };
  }

  private static extractJWTFromCookie(req: RequestType): string | null {
    try {
      if (req.cookies && 'refreshToken' in req.cookies.Authorization) {
        return req.cookies.Authorization.refreshToken;
      }
    } catch (error) {
      throw new HttpException(
        { message: 'Your request have not refresh cookie(' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
