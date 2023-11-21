import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../database/prisma.service';
import { AwsS3Service } from '../aws/aws.service';
import { UsersRepo } from '../user/repositories/user.repo';

import { PostController } from './post.controller';
import { PostsRepo } from './repositories/post.repo';
import { CreatePostUseCase } from './use-case/create.post.use-case';
import { DeletePostUseCase } from './use-case/delete.post.use-case';
import { FindPostsUseCase } from './use-case/find.all.posts.use-case';
import { FindPostUseCase } from './use-case/find.one.post.use-case';
import { UpdatePostUseCase } from './use-case/update.post.use-case';

@Module({
  controllers: [PostController],
  imports: [CqrsModule],
  providers: [
    CreatePostUseCase,
    PostsRepo,
    PrismaService,
    UsersRepo,
    AwsS3Service,
    UpdatePostUseCase,
    DeletePostUseCase,
    FindPostUseCase,
    FindPostsUseCase
  ]
})
export class PostModule {}
