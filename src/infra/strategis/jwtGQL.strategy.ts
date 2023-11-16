import { UserInputError } from '@nestjs/apollo';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

import { UsersRepo } from '../../modules/user/repositories/user.repo';
import { EnvEnum } from '../../utils/env.enum';

const { JWT_SECRET } = EnvEnum;

@Injectable()
export class JwtAuthGQLGuard extends AuthGuard('jwt') {
  constructor(
    private usersRepo: UsersRepo,
    private configService: ConfigService
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([]),
      secretOrKey: configService.get<string>(JWT_SECRET)
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return (await super.canActivate(context)) as boolean;
    } catch (e) {
      throw new UserInputError('Invalid token');
    }
  }

  // @ts-ignore
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const { req, connection } = ctx.getContext();

    return connection?.context?.headers ? connection.context : req;
  }
}
