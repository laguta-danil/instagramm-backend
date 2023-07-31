import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../database/prisma.service';
import { AwsS3Service } from '../aws/aws.service';

import { UsersRepo } from './repositories/user.repo';
import { UpdateUserProfileUseCase } from './use-case/new.password.use-case';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [CqrsModule],
  providers: [
    // service
    PrismaService,
    AwsS3Service,
    // repositories
    UsersRepo,

    UpdateUserProfileUseCase
  ]
})
export class UserModule {}
