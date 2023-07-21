import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserByEmailOrLogin(emailOrLogin: string) {
    const res = await this.prisma.user.findFirst({
      where: { OR: [{ email: emailOrLogin }, { login: emailOrLogin }] }
    });

    console.log('REPO', res);

    return res;
  }
}
