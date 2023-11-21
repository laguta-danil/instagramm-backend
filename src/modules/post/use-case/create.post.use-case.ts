import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AwsS3Service } from '../../aws/aws.service';
import { UsersRepo } from '../../user/repositories/user.repo';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostsRepo } from '../repositories/post.repo';

export class CreatePostCommand {
  constructor(public dto: UpdatePostDto, public files: any) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostUseCase implements ICommandHandler<CreatePostCommand> {
  constructor(
    private postsRepo: PostsRepo,
    private usersRepo: UsersRepo,
    private awsS3Service: AwsS3Service
  ) {}

  async execute({ dto, files }: CreatePostCommand) {
    const imageUrls: any = await Promise.all(
      files.map(async (image: any) => {
        const url: any = await this.awsS3Service.uploadFile(image);

        return url.Location;
      })
    );
    const user = await this.usersRepo.findById(dto.userId);
    user.usersPhoto.push(imageUrls);

    this.awsS3Service.removeDuplicates(user.usersPhoto);

    await this.usersRepo.updateUserProfile(dto.userId, {
      usersPhoto: imageUrls
    });

    return this.postsRepo.createPost({
      ...dto,
      image: imageUrls
    });
  }
}
