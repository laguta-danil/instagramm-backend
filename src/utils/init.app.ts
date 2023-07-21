import { INestApplication } from '@nestjs/common';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

import { AppModule } from '../app.module';
import { HttpExceptionFilter } from '../infra/exception-filter/http.exception.filter';
import { GlobalValidationPipe } from '../infra/pipe/global.validation.pipe';

export const initApp = (app: INestApplication): INestApplication => {
  app.useGlobalPipes(GlobalValidationPipe);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app;
};
