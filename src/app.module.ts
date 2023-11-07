import { MailerModule } from '@nestjs-modules/mailer';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql']
    }),
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
