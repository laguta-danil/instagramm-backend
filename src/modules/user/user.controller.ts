import {
  Body,
  Controller,
  Delete,
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

import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';
import {
  ApiDeleteUser,
  ApiGetUserProfile,
  ApiUpdateUserProfile
} from '../auth/auth.swagger';

import { UpdateUserProfileDto } from './dto/create.dto';
import { DeleteUserCommand } from './use-case/delete.user.use-case';
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
  @ApiDeleteUser()
  async deleteUser(@Req() req) {
    return this.commandBus.execute(new DeleteUserCommand({ id: req.user.id }));
  }

  @Get('/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiGetUserProfile()
  async getUserProfile(@Req() req, @Res() res) {
    const userProfile = await this.commandBus.execute(
      new GetUserProfileCommand({ id: req.user.id })
    );
    res.status(200).send(userProfile);
  }
}
