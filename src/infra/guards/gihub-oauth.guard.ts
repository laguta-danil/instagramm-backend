import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';

interface IGitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

@Injectable()
export class GitHubOAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {
    //  this.configService.get(EnvEnum.GITHUB_AUTH_API);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { query, body }: { query: { token: string }; body: any } = context
      .switchToHttp()
      .getRequest();

    try {
      const octokit = new Octokit({
        auth: `${query.token}`
      });

      const usersEmails: any = await octokit.request('GET /user/emails', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      const primaryMail = usersEmails.data.filter(
        (el: IGitHubEmail) => el.primary
      );

      body.user = primaryMail[0];

      return true;
    } catch (e) {
      throw new HttpException(
        { message: 'Wrong token provided' },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
