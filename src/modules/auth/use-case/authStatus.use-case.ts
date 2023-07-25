import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { AuthUserDto, UserDto } from '../../user/dto/create.dto';
import { UsersRepo } from '../../user/repositories/user.repo';

export class LoginCommand {
  constructor(public dto: Partial<AuthUserDto>) {}
}

@CommandHandler(LoginCommand)
export class AuthStatusUseCase implements ICommandHandler<LoginCommand> {
  constructor(private usersRepo: UsersRepo) {}

  async execute(dto): Promise<LoginCommand> {
    const { email, password } = dto;
    const user: any = await this.usersRepo.checkUserByEmailOrLogin(email);

    throw new HttpException(
      { message: 'Wrong credentials provided' },
      HttpStatus.BAD_REQUEST
    );
  }
}
