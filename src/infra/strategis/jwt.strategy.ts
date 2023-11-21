import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

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
    try {
      if (
        req.cookies.authorization &&
        'accessToken' in req.cookies.authorization
      ) {
        return req.cookies.authorization.accessToken;
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Your request have not access cookie(, please login at first'
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async validate(payload: { id: string }) {
    const user = await this.usersRepo.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      email: user.email,
      id: user.id,
      login: user.login,
      role: user.role
    };
  }
}
