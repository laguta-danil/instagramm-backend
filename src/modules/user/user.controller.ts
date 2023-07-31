import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';
import { ApiUpdateUserProfile } from '../auth/auth.swagger';
import { AwsS3Service } from '../aws/aws.service';

import { UpdateUserProfileDto } from './dto/create.dto';
import { UpdateUserProfileCommand } from './use-case/new.password.use-case';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private awsS3ProfileBuket: AwsS3Service
  ) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUpdateUserProfile()
  @UseInterceptors(FileInterceptor('file'))
  async updateUserProfile(
    @Body() profileData: UpdateUserProfileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.commandBus.execute(
      new UpdateUserProfileCommand({ file, profileData })
    );
  }
}
