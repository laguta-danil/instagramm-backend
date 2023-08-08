import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PostsRepo } from '../repositories/post.repo';

export class DeletePostCommand {
  constructor(public dto: { id: string; userId: string }) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostUseCase implements ICommandHandler<DeletePostCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ dto }: DeletePostCommand) {
    await this.postsRepo.deletePost(dto);
  }
}
