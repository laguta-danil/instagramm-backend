import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import JwtAuthGuard from '../../infra/guards/jwt-auth.guard';

import { CreateProfilePageDto } from './dto/create-profile-page.dto';
import { CreateProfileCommand } from './use-case/create.profile.use-case';

@ApiTags('Profile page')
@Controller('profile-page')
@UseGuards(JwtAuthGuard)
export class ProfilePageController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Req() req, @Body() dto: CreateProfilePageDto) {
    try {
      return this.commandBus.execute(new CreateProfileCommand({ ...dto }));
    } catch (error) {
      throw new HttpException(
        { message: 'Wrong credentials provided' },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  //
  // @Get()
  // findAll() {
  //   return this.profilePageService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profilePageService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProfilePageDto: UpdateProfilePageDto
  // ) {
  //   return this.profilePageService.update(+id, updateProfilePageDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profilePageService.remove(+id);
  // }
}
