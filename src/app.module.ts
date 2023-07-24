import { join } from 'path';

import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerConfig } from './config/mailer.config';
import { DatabaseModule } from './database/database.module';
import { ApiJwtModule } from './modules/jwt/apiJwt.module';
import { EmailModule } from './modules/email/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule.forRootAsync({ useClass: MailerConfig }),
    ApiJwtModule,
    // db
    DatabaseModule,
    // modules
    EmailModule,
    AuthModule,
    UserModule
  ],
  providers: [AppService]
})
export class AppModule {}
