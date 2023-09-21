import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      callbackURL: 'https://instagramm-backend.vercel.app/auth/google/callback',
      clientID:
        '913313577717-cbjosvfjdvf9ntcqv115senspptvmp0s.apps.googleusercontent.com',
      clientSecret: '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',
      scope: ['profile', 'email']
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      provider: 'google',
      providerId: id
    };

    done(null, user);
  }
}
