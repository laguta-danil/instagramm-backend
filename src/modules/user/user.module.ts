import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaService } from '../../database/prisma.service';
import { AwsS3Service } from '../aws/aws.service';

import { UsersRepo } from './repositories/user.repo';
import { DeleteUserUseCase } from './use-case/delete.user.use-case';
import { GetUserProfileUseCase } from './use-case/get.user.profile.use-case';
import { UpdateUserProfileUseCase } from './use-case/update.user.profile.use-case';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolvers';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserResolver, UserService],
  imports: [
    CqrsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      csrfPrevention: false,
      driver: ApolloDriver,
      introspection: true,
      playground: true
      // installSubscriptionHandlers: true
      // typePaths: ['./**/*.graphql']
    })
  ],
  providers: [
    // services
    PrismaService,
    AwsS3Service,
    UpdateUserProfileUseCase,
    DeleteUserUseCase,
    GetUserProfileUseCase,
    // repositories
    UsersRepo,
    UserService,
    UserResolver
  ]
})
export class UserModule {}
