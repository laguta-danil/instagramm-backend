import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerConfig } from './config/mailer.config';
import { EmailModule } from './modules/email/email.module';
import { join } from 'path';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger'
    }),
    MailerModule.forRootAsync({ useClass: MailerConfig }),
    EmailModule
  ],
  providers: [AppService]
})
export class AppModule {}
