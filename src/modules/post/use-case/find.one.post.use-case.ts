import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PostsRepo } from '../repositories/post.repo';

export class FindPostCommand {
  constructor(public id: string, public userId: string) {}
}

@CommandHandler(FindPostCommand)
export class FindPostUseCase implements ICommandHandler<FindPostCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ id, userId }: FindPostCommand) {
    return this.postsRepo.findPostById(id, userId);
  }
}
