import { join } from 'path';

import { MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvEnum } from '../utils/env.enum';

const { TEST_MAILER_EMAIL, TEST_MAILER_PASS } = EnvEnum;

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions() {
    return {
      defaults: {
        from: `"Instagram" <${this.configService.get<string>(
          TEST_MAILER_EMAIL
        )}>`
      },
      template: {
        adapter: new HandlebarsAdapter(),
        dir: join(__dirname, '../modules/email/templates'),
        options: {
          strict: true
        }
      },
      transport: {
        auth: {
          pass: this.configService.get<string>(TEST_MAILER_PASS),
          user: this.configService.get<string>(TEST_MAILER_EMAIL)
        },
        host: 'smtp.gmail.com',
        ignoreTLS: true,
        port: 465,
        secure: true
      }
    };
  }
}
