import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
const swagger = require('./swagger');
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

  const options = {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css'
  };
  const spec = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
  );
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(spec, options));

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
