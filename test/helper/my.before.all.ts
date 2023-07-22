import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma.service';
import { initApp } from '../../src/utils/init.app';
import { deleteAllData } from './delete.all.data';

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

  await deleteAllData(prisma);

  return { myServer: server, prisma };
};
