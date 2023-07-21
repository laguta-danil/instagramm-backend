import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserDto } from '../../user/dto/create.dto';
import { UsersRepo } from '../../user/repositories/user.repo';

export class RegisterCommand {
  constructor(public dto: CreateUserDto) {}
}

@CommandHandler(RegisterCommand)
export class RegisterUseCase implements ICommandHandler<RegisterCommand> {
  constructor(private usersRepo: UsersRepo) {}

  async execute() {
    //  register logic
  }
}
