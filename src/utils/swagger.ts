import { createWriteStream } from 'fs';
import { get } from 'http';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static create(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Backend Generator')
      .setDescription('Documentation API Test')
      .setVersion('1.0')
      .addBearerAuth({ bearerFormat: 'JWT', scheme: 'bearer', type: 'http' })
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/swagger', app, document);

    // get the swagger json file (if app is running in development mode)
    if (process.env.NODE_ENV === 'development') {
      // write swagger ui files
      get(
        `${process.env.DEPLOYED_URL}/swagger/swagger-ui-bundle.js`,
        function (response) {
          response.pipe(
            createWriteStream('swagger-static/swagger-ui-bundle.js')
          );
          console.log(
            `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`
          );
        }
      );

      get(
        `${process.env.DEPLOYED_URL}/swagger/swagger-ui-init.js`,
        function (response) {
          response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
          console.log(
            `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`
          );
        }
      );

      get(
        `${process.env.DEPLOYED_URL}/swagger/swagger-ui-standalone-preset.js`,
        function (response) {
          response.pipe(
            createWriteStream('swagger-static/swagger-ui-standalone-preset.js')
          );
          console.log(
            `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`
          );
        }
      );

      get(
        `${process.env.DEPLOYED_URL}/swagger/swagger-ui.css`,
        function (response) {
          response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
          console.log(
            `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`
          );
        }
      );
    }
  }
}
