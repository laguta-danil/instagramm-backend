import { randomUUID } from 'crypto';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hash } from 'bcrypt';

import { CreateUserServiceDto } from '../../user/dto/create.dto';
import { UsersRepo } from '../../user/repositories/user.repo';

export class RegisterCommand {
  constructor(public dto: CreateUserServiceDto) {}
}

@CommandHandler(RegisterCommand)
export class RegisterUseCase implements ICommandHandler<RegisterCommand> {
  constructor(private usersRepo: UsersRepo) {}

  async execute({ dto }: RegisterCommand) {
    const passwordHash = await hash(dto.password, 10);

    const { id } = await this.usersRepo.createUser({ ...dto, passwordHash });

    const code = randomUUID();

    await this.usersRepo.registerUser({
      confirmCode: code,
      experationDate: this._addMinutesToCurrentDate(2),
      userId: id
    });
  }

  private _addMinutesToCurrentDate(minutes: number) {
    return new Date(new Date().getTime() + 60000 * minutes).toISOString();
  }
}
