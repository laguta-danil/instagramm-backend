import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import { initApp } from '../../src/utils/init.app';

export const myBeforeAll = async () => {
  let app: INestApplication;

  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  app = moduleFixture.createNestApplication();
  app = initApp(app);
  await app.init();
  const server = app.getHttpServer();

  const prisma = app.get(PrismaService);

  return { myServer: server, prismaService: prisma };
};
