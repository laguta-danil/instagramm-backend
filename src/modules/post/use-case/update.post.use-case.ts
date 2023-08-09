import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AwsS3Service } from '../../aws/aws.service';
import { UpdatePostInDB } from '../dto/update-post.dto';
import { PostsRepo } from '../repositories/post.repo';

export class UpdatePostCommand {
  constructor(public dto: UpdatePostInDB, public files: any) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostUseCase implements ICommandHandler<UpdatePostCommand> {
  constructor(
    private postsRepo: PostsRepo,
    private awsS3Service: AwsS3Service
  ) {}

  async execute({ dto, files }: UpdatePostCommand) {
    const { id } = dto;
    const imageUrls = await Promise.all(
      files.map(async (image: any) => {
        const url: any = await this.awsS3Service.uploadFile(image);

        return url.Location;
      })
    );
    await this.postsRepo.updatePost(id, {
      ...dto,
      image: imageUrls
    });
  }
}
