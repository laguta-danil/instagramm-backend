import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';

import { User2 } from './model/user.model';
import { DeleteUserCommand } from './use-case/delete.user.use-case';
import { UserService } from './user.service';

@Resolver(User2)
export class UserResolver {
  constructor(
    private userService: UserService,
    private commandBus: CommandBus
  ) {}

  @Query(() => [User2])
  async getAllUsers(
    @Args('userId', { type: () => String }) userId: string,
    @Args('page', { nullable: true, type: () => Int }) page: number,
    @Args('itemsPerPage', { nullable: true, type: () => Int })
    itemsPerPage: number,
    @Args('search', { nullable: true, type: () => String }) search: string
  ) {
    return this.userService.getAllUsers(userId, page, itemsPerPage, search);
  }

  @Query(() => User2)
  async getUserById(
    @Args('id', { type: () => String }) id: string
  ): Promise<any> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User2)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.commandBus.execute(new DeleteUserCommand({ id: id }));
  }

  @Mutation(() => User2)
  async getAdminRole(
    @Args('id', { type: () => String }) id: number
  ): Promise<any> {
    return this.userService.getAdminRole(id);
  }

  @ResolveField('comment', () => [String])
  async getMovieComment(@Parent() user: User2) {
    // call a service to get comments for specific movie, i.e:
    // this.movieCommentService.getAllMovieCommetsByMovieId(id)
    return ['Test1', 'Test2'];
  }
}
