import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvEnum } from '../../utils/env.enum';

interface Recaptcha {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes': unknown[];
}

@Injectable()
export class RecaptchaGuard implements CanActivate {
  private recaptchaSecret: string;
  constructor(private readonly configService: ConfigService) {
    this.recaptchaSecret = this.configService.get(EnvEnum.RECAPTCHA_SECRET);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();

    const value: string = body.recaptchaValue;

    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?response=${value}&secret=${this.recaptchaSecret}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    const data: Recaptcha = await res.json();

    if (!data.success) {
      throw new ForbiddenException();
    }

    return true;
  }
}
