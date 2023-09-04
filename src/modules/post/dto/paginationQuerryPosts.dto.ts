import { IsString } from 'class-validator';

export class PaginationQuerryPostsDto {
  @IsString()
  page: string;

  @IsString()
  itemsPerPage: string;
}
