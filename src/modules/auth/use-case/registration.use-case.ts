import { randomUUID } from 'crypto';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { hash } from 'bcrypt';

import { EventEnum } from '../../../utils/event.enum';
import { CreateUserServiceDto } from '../../user/dto/create.dto';
import { UsersRepo } from '../../user/repositories/user.repo';

const { SEND_REGISTER_EMAIL_EVENT } = EventEnum;

export class RegisterCommand {
  constructor(public dto: CreateUserServiceDto) {}
}

@CommandHandler(RegisterCommand)
export class RegisterUseCase implements ICommandHandler<RegisterCommand> {
  constructor(
    private usersRepo: UsersRepo,
    private readonly eventEmitter: EventEmitter2
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
      experationDate: this._addMinutesToCurrentDate(2),
      userId: id
    });

    this.eventEmitter.emit(SEND_REGISTER_EMAIL_EVENT, email, code);
  }

  private _addMinutesToCurrentDate(minutes: number) {
    return new Date(new Date().getTime() + 60000 * minutes).toISOString();
  }
}
