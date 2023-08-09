import { IsString } from 'class-validator';

import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends CreatePostDto {
  likes?: number;
  share?: string[];
  userId: string;
}

export class CreatePostInDB extends UpdatePostDto {
  image: string[];
}

export class UpdatePostInDB extends UpdatePostDto {
  @IsString()
  id: string;
}
