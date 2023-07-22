import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersRepo } from '../../user/repositories/user.repo';

export class ConfirmRegisterCommand {
  constructor(public code: string) {}
}

@CommandHandler(ConfirmRegisterCommand)
export class ConfirmRegisterUseCase
  implements ICommandHandler<ConfirmRegisterCommand>
{
  constructor(private usersRepo: UsersRepo) {}

  async execute({ code }: ConfirmRegisterCommand) {
    return this.usersRepo.setConfirmRegister(code);
  }
}
