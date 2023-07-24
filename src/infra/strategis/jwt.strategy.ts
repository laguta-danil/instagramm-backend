import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersRepo } from '../../modules/user/repositories/user.repo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepo: UsersRepo,
    private configService: ConfigService
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        request => request.cookies?.Authorization
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate(payload) {
    console.log(payload);
    const user = await this.usersRepo.findById(payload.id);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { email: user.email, id: user.id };
  }
}
