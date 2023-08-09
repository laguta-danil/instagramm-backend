import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersRepo } from '../repositories/user.repo';

export class GetUserProfileCommand {
  constructor(public dto: { id: string }) {}
}

@CommandHandler(GetUserProfileCommand)
export class GetUserProfileUseCase
  implements ICommandHandler<GetUserProfileCommand>
{
  constructor(private usersRepo: UsersRepo) {}

  async execute({ dto }: GetUserProfileCommand) {
    const user = await this.usersRepo.findById(dto.id);
    console.log(user);

    return user;
  }
}
