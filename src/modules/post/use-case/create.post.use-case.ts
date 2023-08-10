import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AwsS3Service } from '../../aws/aws.service';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostsRepo } from '../repositories/post.repo';

export class CreatePostCommand {
  constructor(public dto: UpdatePostDto, public files: any) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostUseCase implements ICommandHandler<CreatePostCommand> {
  constructor(
    private postsRepo: PostsRepo,
    private awsS3Service: AwsS3Service
  ) {}

  async execute({ dto, files }: CreatePostCommand) {
    const imageUrls = await Promise.all(
      files.map(async (image: any) => {
        const url: any = await this.awsS3Service.uploadFile(image);

        return url.Location;
      })
    );
    await this.postsRepo.createPost({
      ...dto,
      image: imageUrls
    });
  }
}
