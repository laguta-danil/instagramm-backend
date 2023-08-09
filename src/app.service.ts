import { Injectable } from '@nestjs/common';

import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async wipeAllData() {
    await this.prisma.user.deleteMany();
    await this.prisma.usersConfirmEmail.deleteMany();
    await this.prisma.passwordRecovery.deleteMany();
  }
}
