import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvEnum } from '../../utils/env.enum';

const { MAILER_SUBJECT } = EnvEnum;

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendRegistrationEmail(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        context: {
          code
        },
        subject: this.configService.get(MAILER_SUBJECT),
        template: './register',
        to: email
      });

      return true;
    } catch (error) {
      let message: string;
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error(`Error sending email to ${email}: ${message}`);

      return null;
    }
  }
}
