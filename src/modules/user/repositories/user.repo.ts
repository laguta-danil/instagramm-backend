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
    this.prisma.usersConfirmEmail.create({ data: dto });
  }

  async checkUserByEmailOrLogin(emailOrLogin: string) {
    return this.prisma.user.findFirst({
      where: { OR: [{ email: emailOrLogin }, { login: emailOrLogin }] }
    });
  }
}
