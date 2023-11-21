import { IsString } from 'class-validator';

import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends CreatePostDto {
  likes?: number;
  share?: string[];
  usersPhoto?: string[];
  userId: string;
}

export class CreatePostInDB extends UpdatePostDto {
  image?: string[] | null;
}

export class UpdatePostInDB extends UpdatePostDto {
  @IsString()
  id: string;
}
