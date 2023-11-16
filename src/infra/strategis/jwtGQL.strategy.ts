import { UserInputError } from '@nestjs/apollo';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { UsersRepo } from '../../modules/user/repositories/user.repo';

@Injectable()
export class JwtAuthGQLGuard extends AuthGuard('jwt') {
  constructor(private usersRepo: UsersRepo) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const a: any = this.getRequest(context);
    console.log(a);
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

  async validate(payload: { id: string }) {
    const user = await this.usersRepo.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { email: user.email, id: user.id, login: user.login };
  }
}
