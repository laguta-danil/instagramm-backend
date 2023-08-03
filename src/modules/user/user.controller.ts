import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';
import { ApiGetUserProfile, ApiUpdateUserProfile } from '../auth/auth.swagger';
import { AwsS3Service } from '../aws/aws.service';

import { UpdateUserProfileDto } from './dto/create.dto';
import { DeleteUserCommand } from './use-case/delete.user.use-case';
import { GetUserProfileCommand } from './use-case/get.user.profile.use-case';
import { UpdateUserProfileCommand } from './use-case/update.user.profile.use-case';

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
    @Req() req,
    @Body() profileData: UpdateUserProfileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.commandBus.execute(
      new UpdateUserProfileCommand({ file, id: req.user.id, profileData })
    );
  }

  @Delete('/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUpdateUserProfile()
  async deleteUser(@Req() req) {
    return this.commandBus.execute(new DeleteUserCommand({ id: req.user.id }));
  }

  @Get('/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiGetUserProfile()
  async getUserProfile(@Req() req) {
    return this.commandBus.execute(
      new GetUserProfileCommand({ id: req.user.id })
    );
  }
}
