import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hash } from 'bcrypt';

import { UsersRepo } from '../../user/repositories/user.repo';
import { NewPasswordServiceDto } from '../dto/new.password.dto';

export class NewPasswordCommand {
  constructor(public dto: NewPasswordServiceDto) {}
}

@CommandHandler(NewPasswordCommand)
export class NewPasswordUseCase implements ICommandHandler<NewPasswordCommand> {
  constructor(private usersRepo: UsersRepo) {}

  async execute({ dto }: NewPasswordCommand) {
    const { newPassword, recoveryCode } = dto;

    const passwordHash = await hash(newPassword, 10);

    return this.usersRepo.setNewPass({
      newPasswordHash: passwordHash,
      recoveryCode
    });
  }
}
