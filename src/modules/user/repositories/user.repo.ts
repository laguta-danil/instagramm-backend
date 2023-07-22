import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
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
      select: { experationDate: true, isConfirmed: true },
      where: { confirmCode: code }
    });
  }

  async setConfirmRegister(code: string) {
    return this.prisma.usersConfirmEmail.update({
      data: { isConfirmed: true },
      where: { confirmCode: code }
    });
  }

  async checkUserByEmailOrLogin(emailOrLogin: string) {
    return this.prisma.user.findFirst({
      where: { OR: [{ email: emailOrLogin }, { login: emailOrLogin }] }
    });
  }
}
