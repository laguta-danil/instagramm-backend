import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { EnvEnum } from '../../utils/env.enum';
import { EventEnum } from '../../utils/event.enum';

const { MAILER_SUBJECT, FRONTEND_CONFIRM_EMAIL_LINK } = EnvEnum;

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  @OnEvent(EventEnum.SEND_REGISTER_EMAIL_EVENT)
  async sendRegistrationEmail(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        context: {
          code,
          link: this.configService.get(FRONTEND_CONFIRM_EMAIL_LINK)
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
