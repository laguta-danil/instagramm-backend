import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initApp } from './utils/init.app';
import { SwaggerConfig } from './utils/swagger';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initApp(app);

  SwaggerConfig.create(app);

  await app.listen(PORT, () => {
    console.log(`App started at: ${PORT} port`);
  });
}
bootstrap();
