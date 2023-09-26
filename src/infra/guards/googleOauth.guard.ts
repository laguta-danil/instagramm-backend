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

@Injectable()
export class OAuth2Guard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    // this.configService.get(EnvEnum.GOOGLE_AUTH_API);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { query, body }: { query: { token: string }; body: any } = context
      .switchToHttp()
      .getRequest();

    try {
      body.user = await lastValueFrom(
        this.httpService
          .get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${query.token}`,
            { headers: { 'Content-Type': 'application/json' } }
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
