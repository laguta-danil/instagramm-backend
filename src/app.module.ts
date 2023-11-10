import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerConfig } from './config/mailer.config';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { AwsModule } from './modules/aws/aws.module';
import { EmailModule } from './modules/email/email.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule.forRootAsync({ useClass: MailerConfig }),
    // graphQL

    // db
    DatabaseModule,
    // modules
    EmailModule,
    AuthModule,
    UserModule,
    AwsModule,
    PostModule
  ],
  providers: [AppService, PrismaService]
})
export class AppModule {}
