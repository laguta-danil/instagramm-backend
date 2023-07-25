import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { UsersRepo } from '../../modules/user/repositories/user.repo';
import { EnvEnum } from '../../utils/env.enum';

const { JWT_SECRET } = EnvEnum;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersRepo: UsersRepo,
    private configService: ConfigService
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie
      ]),
      secretOrKey: configService.get<string>(JWT_SECRET)
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (
      req.cookies.Authorization &&
      'accessToken' in req.cookies.Authorization
    ) {
      return req.cookies.Authorization.accessToken;
    }

    return null;
  }

  async validate(payload: { id: string }) {
    const user = await this.usersRepo.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { email: user.email, id: user.id, login: user.login };
  }
}