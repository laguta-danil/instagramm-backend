import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import * as https from 'https';
import * as path from 'path';
import * as process from 'process';
import swaggerUI from 'swagger-ui-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend Generator')
    .setDescription('Documentation API Test')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // get the swagger json file (if app is running in development mode)
  // if (process.env.NODE_ENV === 'development') {
  //   // write swagger ui files
  //   https.get(
  //     `${process.env.DEPLOYED_URL}/swagger/swagger-ui-bundle.js`,
  //     function (response) {
  //       response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
  //       console.log(
  //         `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`
  //       );
  //     }
  //   );
  //
  //   https.get(
  //     `${process.env.DEPLOYED_URL}/swagger/swagger-ui-init.js`,
  //     async function (response) {
  //       response.pipe(
  //         await createWriteStream('swagger-static/swagger-ui-init.js')
  //       );
  //       console.log(
  //         `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`
  //       );
  //     }
  //   );
  //
  //   https.get(
  //     `${process.env.DEPLOYED_URL}/swagger/swagger-ui-standalone-preset.js`,
  //     function (response) {
  //       response.pipe(
  //         createWriteStream('swagger-static/swagger-ui-standalone-preset.js')
  //       );
  //       console.log(
  //         `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`
  //       );
  //     }
  //   );
  //
  //   https.get(
  //     `${process.env.DEPLOYED_URL}/swagger/swagger-ui.css`,
  //     function (response) {
  //       response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
  //       console.log(
  //         `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`
  //       );
  //     }
  //   );
  // }

  await app.listen(3000);
}
bootstrap();
