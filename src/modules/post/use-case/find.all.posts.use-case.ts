import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PaginationQuerryPostsDto } from '../dto/paginationQuerryPosts.dto';
import { PostsRepo } from '../repositories/post.repo';

export class FindPostsCommand {
  constructor(
    public dto: { userId: string; query: PaginationQuerryPostsDto }
  ) {}
}

@CommandHandler(FindPostsCommand)
export class FindPostsUseCase implements ICommandHandler<FindPostsCommand> {
  constructor(private postsRepo: PostsRepo) {}

  async execute({ dto }: FindPostsCommand) {
    const { userId, query } = dto;
    const { itemsPerPage, page } = query;

    const take = +itemsPerPage || 10;
    const skip = (+page - 1) * +itemsPerPage || 0;

    return this.postsRepo.findAll(userId, take, skip);
  }
}
