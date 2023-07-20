import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
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

  return { myServer: server };
};
