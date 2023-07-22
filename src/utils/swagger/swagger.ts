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
  }
}
