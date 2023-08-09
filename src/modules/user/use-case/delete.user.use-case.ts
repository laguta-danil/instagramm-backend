import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersRepo } from '../repositories/user.repo';

export class DeleteUserCommand {
  constructor(public dto: { id: string }) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase implements ICommandHandler<DeleteUserCommand> {
  constructor(private usersRepo: UsersRepo) {}

  async execute({ dto }: DeleteUserCommand) {
    return this.usersRepo.deleteUser(dto.id);
  }
}
