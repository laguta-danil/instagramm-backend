import { Module } from '@nestjs/common';

import { UsersQueryRepo } from './repositories/user.query.repo';
import { UsersRepo } from './repositories/user.repo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    // service
    UserService,
    UsersRepo,
    UsersQueryRepo
  ]
})
export class UserModule {}
