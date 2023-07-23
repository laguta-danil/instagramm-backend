import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ApiJwtService } from '../jwt/apiJwt.services';
import { UsersRepo } from '../user/repositories/user.repo';

interface Info {
  expirationDate: Date;
  isConfirmed: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepo,
    private jwtService: ApiJwtService
  ) {
  }

  public async validateUser(email: string, password: string) {
    const user = await this.usersRepo.checkUserByEmailOrLogin(email);

    if (await this.verifyPassword(password, user.passwordHash)) {
      return user;
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    return !!isPasswordMatching;
  }

  public getCookieWithJwtToken(id: number) {
    return this.jwtService.createJWT({ id });
  }

  public checkAuthCode(info: Info) {
    if (!info) {
      return false;
    }

    if (info.isConfirmed) {
      return false;
    }

    if (info.expirationDate < new Date()) {
      return false;
    }

    return true;
  }
}