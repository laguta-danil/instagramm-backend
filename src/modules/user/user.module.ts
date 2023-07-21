import { Module } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { UsersQueryRepo } from './repositories/user.query.repo';
import { UsersRepo } from './repositories/user.repo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    // service
    PrismaService,
    UserService,
    UsersRepo,
    UsersQueryRepo
  ]
})
export class UserModule {}
