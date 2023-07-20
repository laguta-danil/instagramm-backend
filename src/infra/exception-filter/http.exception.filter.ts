import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 400) {
      const errRes: any = exception.getResponse();

      return res.status(status).json({ errorsMessages: errRes.message });
    }

    if (status === 500) {
      this.logger.error(exception.getResponse());

      return res.status(status).json({ message: 'Internal server error' });
    }

    return res.sendStatus(status);
  }
}
