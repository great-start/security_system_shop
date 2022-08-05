import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, cb) {
    try {
      const { name, email } = profile._json;

      const user = { email, firstName: name };

      cb(null, user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
