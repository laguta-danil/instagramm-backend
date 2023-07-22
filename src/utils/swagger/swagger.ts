import * as fs from 'fs';
import * as https from 'https';

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
    SwaggerModule.setup('/swagger', app, document, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
      ]
    });

    // get the swagger json file (if app is running in development mode)
    // if (process.env.NODE_ENV === 'development') {
    //   https.get(
    //     `${process.env.DEPLOYED_URL}/swagger/swagger-ui-bundle.js`,
    //     function (response) {
    //       response.pipe(
    //         fs.createWriteStream('swagger-static/swagger-ui-bundle.js')
    //       );
    //       console.log(
    //         `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`
    //       );
    //     }
    //   );
    //
    //   https.get(
    //     `${process.env.DEPLOYED_URL}/swagger/swagger-ui-init.js`,
    //     function (response) {
    //       response.pipe(
    //         fs.createWriteStream('swagger-static/swagger-ui-init.js')
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
    //         fs.createWriteStream(
    //           'swagger-static/swagger-ui-standalone-preset.js'
    //         )
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
    //       response.pipe(fs.createWriteStream('swagger-static/swagger-ui.css'));
    //       console.log(
    //         `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`
    //       );
    //     }
    //   );
    // }
  }
}
