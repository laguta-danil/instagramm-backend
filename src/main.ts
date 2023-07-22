import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { initApp } from './utils/init.app';
import { SwaggerConfig } from './utils/swagger/swagger';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initApp(app);

  // SwaggerConfig.create(app);

  await app.listen(PORT, () => {
    Logger.log(`App started at: ${PORT} port`);
  });
}
bootstrap();
