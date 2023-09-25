import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

// interface Inter {

// }

@Injectable()
export class OAuth2Guard implements CanActivate {
  private token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    // this.recaptchaSecret = this.configService.get(EnvEnum.RECAPTCHA_SECRET);
  }

  header = { headers: { 'Content-Type': 'application/json' } };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { query, body }: { query: { token: string }; body: any } = context
      .switchToHttp()
      .getRequest();

    try {
      body.user = await lastValueFrom(
        this.httpService
          .get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${query.token}`,
            this.header
          )
          .pipe(map(res => res.data))
      );

      return true;
    } catch (e) {
      throw new HttpException(
        { message: 'Wrong token provided' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
