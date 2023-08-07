import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AwsS3Service } from '../../aws/aws.service';
import { UsersRepo } from '../repositories/user.repo';
import { UpdateUserProfileDto } from '../dto/create.dto';

export class UpdateUserProfileCommand {
  constructor(
    public dto: {
      profileData: UpdateUserProfileDto;
      file: Express.Multer.File;
      id: string;
    }
  ) {}
}

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileUseCase
  implements ICommandHandler<UpdateUserProfileCommand>
{
  constructor(
    private usersRepo: UsersRepo,
    private awsS3ProfileBucket: AwsS3Service
  ) {}

  async execute({ dto }: UpdateUserProfileCommand) {
    const { id } = dto;
    const { file } = dto;
    const fileData = await this.awsS3ProfileBucket.uploadFile(file);
    dto.profileData.photo = fileData.Location;

    return this.usersRepo.updateUserProfile(id, dto.profileData);
  }
}
