import { UserInputError } from '@nestjs/apollo';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { EnvEnum } from '../../utils/env.enum';

const { JWT_SECRET } = EnvEnum;

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    // if (user.role === 'Admin') {
    //   return {
    //     email: user.email,
    //     id: user.id,
    //     login: user.login,
    //     role: user.role
    //   };
    // }
    const requiredRoles = this.reflector.get('roles', context.getHandler());

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (
      !requiredRoles.some(requiredRoles =>
        req?.user?.role?.includes(requiredRoles)
      )
    ) {
      throw new UserInputError('You are not administrator');
    } else {
      return true;
    }
  }
}
