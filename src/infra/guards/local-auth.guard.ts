/* istanbul ignore file */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // debugging before guards be used
  // handleRequest(err, user, info, context, status) {
  //   console.log(user);
  //   console.log(status);
  //   console.log(info);
  //   console.log(err);
  //
  //   const request = context.switchToHttp().getRequest();
  //   const { mobile, password } = request.body;
  //   if (err || !user) {
  //     if (!mobile) {
  //       throw new HttpException({ message: 'yesyes' }, HttpStatus.GONE);
  //     } else if (!password) {
  //       throw new HttpException(
  //         { message: 'nononononon' },
  //         HttpStatus.CONFLICT
  //       );
  //     } else {
  //       throw err || new UnauthorizedException();
  //     }
  //   }
  //
  //   return user;
  // }
}
