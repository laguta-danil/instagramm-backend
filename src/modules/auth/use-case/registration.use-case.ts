import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class RegisterCommand {
  //   constructor(public dto: CreateUserDto) {}
}

@CommandHandler(RegisterCommand)
export class RegisterUseCase implements ICommandHandler<RegisterCommand> {
  //   constructor(private usersRepo: UsersRepo) {}

  async execute() {
    //  register logic
  }
}
