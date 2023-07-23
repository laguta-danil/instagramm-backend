import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { ResendingDbDto } from '../../auth/dto/email.resending.dto';
import { RegisterDbDto } from '../../auth/dto/register.dto';
import { CreateUserDbDto } from '../dto/create.dto';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDbDto) {
    return this.prisma.user.create({ data: dto, select: { id: true } });
  }

  async registerUser(dto: RegisterDbDto) {
    return this.prisma.usersConfirmEmail.create({ data: dto });
  }

  async getConfirmEmailInfoByCode(code: string) {
    return this.prisma.usersConfirmEmail.findUnique({
      select: { expirationDate: true, isConfirmed: true },
      where: { confirmCode: code }
    });
  }

  async setConfirmRegister(code: string) {
    return this.prisma.usersConfirmEmail.update({
      data: { isConfirmed: true },
      where: { confirmCode: code }
    });
  }

  async getConfirmEmailInfoByEmail(email: string) {
    return this.prisma.usersConfirmEmail.findFirst({
      select: { expirationDate: true, isConfirmed: true },
      where: { user: { email } }
    });
  }

  async updateConfirmEmailInfo(dto: ResendingDbDto) {
    const { email, newCode, newExpDate } = dto;

    const user = await this.prisma.user.findUnique({
      select: { id: true },
      where: { email }
    });

    if (!user) {
      throw new Error('User not found'); // this shouldn't happen, just the manners of a prisma
    }

    return this.prisma.usersConfirmEmail.update({
      data: { confirmCode: newCode, expirationDate: newExpDate },
      where: { userId: user.id }
    });
  }

  async checkUserByEmailOrLogin(emailOrLogin: string) {
    return this.prisma.user.findFirst({
      where: { OR: [{ email: emailOrLogin }, { login: emailOrLogin }] }
    });
  }
}
