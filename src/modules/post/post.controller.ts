import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';
import { RequserWithUser } from '../../infra/strategis/dto/mutatedRequst.dto';
import {
  ApiCreatePost,
  ApiDeletePost,
  ApiGetPost,
  ApiGetPosts,
  ApiUpdatePost
} from '../auth/auth.swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { PaginationQuerryPostsDto } from './dto/paginationQuerryPosts.dto';
import { UpdatePostInDB } from './dto/update-post.dto';
import { CreatePostCommand } from './use-case/create.post.use-case';
import { DeletePostCommand } from './use-case/delete.post.use-case';
import { FindPostsCommand } from './use-case/find.all.posts.use-case';
import { FindPostCommand } from './use-case/find.one.post.use-case';
import { UpdatePostCommand } from './use-case/update.post.use-case';

@ApiTags('Posts')
@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiCreatePost()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Req() req: RequserWithUser,
    @Body() dto: CreatePostDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.commandBus.execute(
      new CreatePostCommand(
        {
          ...dto,
          userId: req.user.id
        },
        files || null
      )
    );
  }

  @ApiGetPosts()
  @Get('all')
  findAll(
    @Req() req: RequserWithUser,
    @Query() query: PaginationQuerryPostsDto
  ) {
    return this.commandBus.execute(
      new FindPostsCommand({ query: query, userId: req.user.id })
    );
  }

  @ApiGetPost()
  @Get()
  findOne(@Req() req: RequserWithUser, @Body() body: { id: string }) {
    return this.commandBus.execute(new FindPostCommand(body.id, req.user.id));
  }

  @ApiUpdatePost()
  @Patch()
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Req() req: RequserWithUser,
    @Body() updatePostDto: UpdatePostInDB,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.commandBus.execute(
      new UpdatePostCommand({ ...updatePostDto, userId: req.user.id }, files)
    );
  }

  @ApiDeletePost()
  @Delete()
  remove(@Req() req: RequserWithUser, @Body() body: { id: string }) {
    return this.commandBus.execute(
      new DeletePostCommand({ id: body.id, userId: req.user.id })
    );
  }
}
