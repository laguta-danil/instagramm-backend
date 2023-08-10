import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PostsRepo } from '../repositories/post.repo';

export class FindPostsCommand {
  constructor(public userId: string) {}
}

@CommandHandler(FindPostsCommand)
export class FindPostsUseCase implements ICommandHandler<FindPostsCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ userId }: FindPostsCommand) {
    return this.postsRepo.findAll(userId);
  }
}
