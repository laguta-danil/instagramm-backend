import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    private apiJwtService: ApiJwtService,
    private httpSevice: HttpService
  ) {}

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

  // private getJwtTokens(id: string) {
  //   return this.apiJwtService.createJWT(id);
  // }

  private async updateRefreshTokenInUserRep(
    userId: string,
    refreshToken: string
  ) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepo.updateUserProfile(userId, {
      refreshToken: hashedRefreshToken
    });
  }

  async login(data) {
    const user = await this.usersRepo.findById(data.id);
    if (user) {
      const tokens = await this.apiJwtService.createJWT(data.id);
      await this.updateRefreshTokenInUserRep(data.id, tokens.refreshToken);

      return tokens;
    }

    throw new HttpException(
      { message: 'Wrong credentials provided' },
      HttpStatus.BAD_REQUEST
    );
  }

  async refreshAccessToken(req) {
    const id = req.user.userId;
    const refreshToken = req.cookies.Authorization.refreshToken;
    const user: any = await this.usersRepo.findById(id, 'refreshToken');

    if (await bcrypt.compare(refreshToken, user.refreshToken)) {
      return this.apiJwtService.getNewAccessToken(user.id, refreshToken);
    }
    throw new HttpException(
      { message: 'Refresh token expired' },
      HttpStatus.BAD_REQUEST
    );
  }

  async oAuth2(userData: any) {
    try {
      const user = await this.usersRepo.checkUserByEmail(userData.email);

      return this.apiJwtService.createJWT(user.id);
    } catch (e) {
      const newUser = await this.usersRepo.createUser({
        email: userData.email,
        passwordHash: Math.random().toString()
      });

      return this.apiJwtService.createJWT(newUser.id);
    }
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
