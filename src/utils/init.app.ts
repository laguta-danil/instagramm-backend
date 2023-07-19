import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { HttpExceptionFilter } from '../infra/exception-filter/http.exception.filter';
import { GlobalValidationPipe } from '../infra/pipe/global.validation.pipe';

export const initApp = (app: INestApplication): INestApplication => {
  app.useGlobalPipes(GlobalValidationPipe);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());

  return app;
};
