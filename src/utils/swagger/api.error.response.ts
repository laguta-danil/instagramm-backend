import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ApiError {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message: string;
}

export class ApiErrorResponse {
  @ApiProperty({ type: [ApiError] })
  errorsMessages: ApiError[];
}

export const apiBadRequestResponse = {
  description: 'Bad Request',
  status: HttpStatus.BAD_REQUEST,
  type: ApiErrorResponse
};
