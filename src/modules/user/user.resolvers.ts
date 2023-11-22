import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';

import { HasRoles } from '../../infra/decorator/user/has-roles.decorator';
import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';
import { JwtAuthGQLGuard } from '../../infra/strategis/jwtGQL.strategy';
import { RoleGuard } from '../../infra/strategis/role.guard';

import { Role } from './dto/role.enum';
import { User2, Users } from './model/user.model';
import { DeleteUserCommand } from './use-case/delete.user.use-case';
import { UserService } from './user.service';

@Resolver(User2)
export class UserResolver {
  constructor(
    private userService: UserService,
    private commandBus: CommandBus
  ) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGQLGuard, RoleGuard)
  @Query(() => Users)
  async getAllUsers(
    @Args('page', { nullable: true, type: () => Int }) page: number,
    @Args('itemsPerPage', { nullable: true, type: () => Int })
    itemsPerPage: number,
    @Args('search', { nullable: true, type: () => String }) search: string,
    @Args('sortByCreateDate', { nullable: true, type: () => String })
    sortByCreateDate: string,
    @Args('sortByUserName', { nullable: true, type: () => String })
    sortByUserName: string,
    @Context() context: any
  ) {
    return this.userService.getAllUsers(
      page,
      itemsPerPage,
      search,
      sortByCreateDate,
      sortByUserName
    );
  }

  @Query(() => User2)
  async getUserById(
    @Args('id', { type: () => String }) id: string
  ): Promise<any> {
    return this.userService.getUserById(id);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGQLGuard, RoleGuard)
  @Mutation(() => User2)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.commandBus.execute(new DeleteUserCommand({ id: id }));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User2)
  async getAdminRole(
    @Args('id', { type: () => String }) id: number
  ): Promise<any> {
    return this.userService.getAdminRole(id);
  }

  @ResolveField('comment', () => [String])
  async getComment(@Parent() user: User2) {
    // call a service to get comments for specific movie, i.e:
    // this.movieCommentService.getAllMovieCommetsByMovieId(id)
    return ['Test1', 'Test2'];
  }
}
