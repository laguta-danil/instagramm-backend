import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PostsRepo } from '../repositories/post.repo';

export class FindPostCommand {
  constructor(public id: string, public userId: string) {}
}

@CommandHandler(FindPostCommand)
export class FindPostUseCase implements ICommandHandler<FindPostCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ id, userId }: FindPostCommand) {
    if (id && userId) {
      return this.postsRepo.findPostById(id, userId);
    }
    throw new HttpException(
      { message: 'Post id or userId is empty' },
      HttpStatus.BAD_REQUEST
    );
  }
}
