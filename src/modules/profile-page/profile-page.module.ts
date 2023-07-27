import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../database/prisma.service';

import { ProfilePageController } from './profile-page.controller';
import { ProfilesRepo } from './repositoies/profile.repo';
import { CreateProfileUseCase } from './use-case/create.profile.use-case';

@Module({
  controllers: [ProfilePageController],
  imports: [CqrsModule],
  providers: [PrismaService, ProfilesRepo, CreateProfileUseCase]
})
export class ProfilePageModule {}
