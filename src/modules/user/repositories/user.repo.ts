import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { ResendingDbDto } from '../../auth/dto/email.resending.dto';
import { NewPasswordDbDto } from '../../auth/dto/new.password.dto';
import { PasswordRecoveryDbDto } from '../../auth/dto/password.recovery.dto';
import { RegisterDbDto } from '../../auth/dto/register.dto';
import { CreateUserDbDto } from '../dto/create.dto';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDbDto) {
    return this.prisma.user.create({ data: dto, select: { id: true } });
  }

  async registerUser(dto: RegisterDbDto) {
    // @ts-ignore
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
      select: { email: true, id: true, login: true, passwordHash: true },
      where: { OR: [{ email: emailOrLogin }, { login: emailOrLogin }] }
    });
  }

  async findById(id: string) {
    return this.prisma.user.findFirst({
      where: { id }
    });
  }

  async setRecoveryPassInfo(dto: PasswordRecoveryDbDto) {
    const { userId, recoveryCode, expirationDate } = dto;

    return this.prisma.passwordRecovery.upsert({
      create: dto,
      update: { expirationDate, isConfirmed: false, recoveryCode },
      where: { userId }
    });
  }

  async getRecoveryPassInfoByCode(code: string) {
    return this.prisma.passwordRecovery.findUnique({
      where: { recoveryCode: code }
    });
  }

  async setNewPass(dto: NewPasswordDbDto) {
    const { newPasswordHash, recoveryCode } = dto;

    const recoveryInfo = await this.prisma.passwordRecovery.findUnique({
      select: { userId: true },
      where: { recoveryCode }
    });

    if (!recoveryInfo) {
      throw new Error('Password recovery not found'); // this shouldn't happen, just the manners of a prisma
    }

    return this.prisma.$transaction(
      [
        this.prisma.passwordRecovery.update({
          data: { isConfirmed: true },
          where: { userId: recoveryInfo.userId }
        }),
        this.prisma.user.update({
          data: { passwordHash: newPasswordHash },
          where: { id: recoveryInfo.userId }
        })
      ],
      { isolationLevel: 'Serializable' }
    );
  }

  async checkUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
