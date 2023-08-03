import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../database/prisma.service';
import { AwsS3Service } from '../aws/aws.service';

import { UsersRepo } from './repositories/user.repo';
import { DeleteUserUseCase } from './use-case/delete.user.use-case';
import { GetUserProfileUseCase } from './use-case/get.user.profile.use-case';
import { UpdateUserProfileUseCase } from './use-case/update.user.profile.use-case';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [CqrsModule],
  providers: [
    // service
    PrismaService,
    AwsS3Service,
    UpdateUserProfileUseCase,
    DeleteUserUseCase,
    GetUserProfileUseCase,
    // repositories
    UsersRepo
  ]
})
export class UserModule {}
