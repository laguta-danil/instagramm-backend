import { randomUUID } from 'crypto';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hash } from 'bcrypt';

import { addMinutesToCurrentDate } from '../../../helper/add.minutes.to.current.date';
import { EmailService } from '../../email/email.service';
import { CreateUserServiceDto } from '../../user/dto/create.dto';
import { UsersRepo } from '../../user/repositories/user.repo';

export class RegisterCommand {
  constructor(public dto: CreateUserServiceDto) {}
}

@CommandHandler(RegisterCommand)
export class RegisterUseCase implements ICommandHandler<RegisterCommand> {
  constructor(
    private usersRepo: UsersRepo,
    private emailService: EmailService
  ) {}

  async execute({ dto }: RegisterCommand) {
    const { email, login, password } = dto;

    const passwordHash = await hash(password, 10);

    const { id } = await this.usersRepo.createUser({
      email,
      login,
      passwordHash
    });

    const code = randomUUID();

    await this.usersRepo.registerUser({
      confirmCode: code,
      expirationDate: addMinutesToCurrentDate(2),
      userId: id
    });

    await this.emailService.sendRegistrationEmail(email, code);
  }
}
