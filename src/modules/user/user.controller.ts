import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';
import { RequestWithUserData } from '../../infra/types/RequestWithUserData';
import { ApiGetUserProfile, ApiUpdateUserProfile } from '../auth/auth.swagger';

import { UpdateUserProfileDto } from './dto/create.dto';
import { GetUserProfileCommand } from './use-case/get.user.profile.use-case';
import { UpdateUserProfileCommand } from './use-case/update.user.profile.use-case';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUpdateUserProfile()
  @UseInterceptors(FileInterceptor('file'))
  async updateUserProfile(
    @Req() req: RequestWithUserData,
    @Body() profileData: UpdateUserProfileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.commandBus.execute(
      new UpdateUserProfileCommand({ file, id: req.user.id, profileData })
    );
  }

  // @Delete('/delete')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiDeleteUser()
  // async deleteUser(@Req() req: RequestWithUserData) {
  //   return this.commandBus.execute(new DeleteUserCommand({ id: req.user.id }));
  // }

  @Get('/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiGetUserProfile()
  async getUserProfile(@Req() req: RequestWithUserData, @Res() res: Response) {
    const userProfile = await this.commandBus.execute(
      new GetUserProfileCommand({ id: req.user.id })
    );
    res.status(200).send(userProfile);
  }
}
