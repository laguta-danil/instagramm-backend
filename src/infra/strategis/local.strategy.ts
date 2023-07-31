import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string) {
    try {
      return await this.authService.validateUser(login, password);
    } catch (error) {
      throw new HttpException(
        { message: 'Wrong credentials provided' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
