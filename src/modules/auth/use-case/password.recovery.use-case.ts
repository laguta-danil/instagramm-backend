import { randomUUID } from 'crypto';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { addMinutesToCurrentDate } from '../../../helper/add.minutes.to.current.date';
import { EmailService } from '../../email/email.service';
import { UsersRepo } from '../../user/repositories/user.repo';

export class PasswordRecoveryCommand {
  constructor(public email: string) {}
}

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryUseCase
  implements ICommandHandler<PasswordRecoveryCommand>
{
  constructor(
    private usersRepo: UsersRepo,
    private emailService: EmailService
  ) {}

  async execute({ email }: PasswordRecoveryCommand) {
    const user = await this.usersRepo.checkUserByEmailOrLogin(email);

    if (!user) {
      return;
    }

    const recoveryCode = randomUUID();

    await this.usersRepo.setRecoveryPassInfo({
      expirationDate: addMinutesToCurrentDate(2),
      recoveryCode,
      userId: user.id
    });

    return this.emailService.sendPasswordRecoveryEmail(email, recoveryCode);
  }
}
