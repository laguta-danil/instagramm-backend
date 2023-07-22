import { randomUUID } from 'crypto';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { addMinutesToCurrentDate } from '../../../helper/add.minutes.to.current.date';
import { EmailService } from '../../email/email.service';
import { UsersRepo } from '../../user/repositories/user.repo';

export class ResendingCommand {
  constructor(public email: string) {}
}

@CommandHandler(ResendingCommand)
export class ResendingUseCase implements ICommandHandler<ResendingCommand> {
  constructor(
    private usersRepo: UsersRepo,
    private emailService: EmailService
  ) {}

  async execute({ email }: ResendingCommand) {
    const newCode = randomUUID();

    await this.usersRepo.updateConfirmEmailInfo({
      email,
      newCode,
      newExpDate: addMinutesToCurrentDate(2)
    });

    return this.emailService.sendRegistrationEmail(email, newCode);
  }
}
