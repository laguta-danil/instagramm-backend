import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProfilePageDto } from '../dto/create-profile-page.dto';
import { ProfilesRepo } from '../repositoies/profile.repo';

export class CreateProfileCommand {
  constructor(public dto: CreateProfilePageDto) {}
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileUseCase
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(private profileRepo: ProfilesRepo) {}

  async execute({ dto }: CreateProfileCommand) {
    return this.profileRepo.updateProfile(dto);
  }
}
