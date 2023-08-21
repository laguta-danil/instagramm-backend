import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    this.$use(async (params, next) =>
      this.excludePasswordMiddleware(params, next)
    );
  }

  async onModuleInit() {
    await this.$connect();
  }

  async excludePasswordMiddleware(params, next) {
    const result = await next(params);
    if (
      params?.model === 'User' &&
      params?.args?.select?.passwordHash !== true
    ) {
      delete result.passwordHash;
      delete result.refreshToken;
    }

    return result;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
