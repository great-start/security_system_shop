import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';

import { TokenService } from './token.service';
import { SignInUserDto } from './dto/signIn.user.dto';
import { IRequestExtended } from './models/requestExtended.interface';
import { constants } from '../constants';
import { SignUpUserDto } from './dto/signUp.user.dto';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(user: SignUpUserDto) {
    try {
      const existingUser = await this.userService.findOneByEmail(user.email.toLowerCase());

      if (existingUser) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      const hashPass = await bcrypt.hash(user.password, 7);
      const savedUser = await this.userService.saveUserToDB({
        ...user,
        email: user.email.toLowerCase(),
        password: hashPass,
      });

      const tokenPair = await this.tokenService.getTokenPair(savedUser);

      const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

      return {
        accessToken,
        refreshToken,
        user: {
          id: savedUser.id,
          email: savedUser.email,
        },
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async signIn(userData: SignInUserDto) {
    try {
      const existingUser = await this._validateUser(userData);

      const tokenPair = await this.tokenService.getTokenPair(existingUser);

      const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

      return {
        accessToken,
        refreshToken,
        user: {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
        },
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async googleAuth({ googleToken }) {
    try {
      const { email, name, picture, given_name } = (await this.tokenService.decodeToken(
        googleToken,
      )) as JwtPayload;

      let user = await this.userService.findOneByEmail(email);

      if (!user) {
        user = await this.userService.createFromGoogle(email, name);
      }

      const tokenPair = await this.tokenService.getTokenPair(user);

      const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  private async _validateUser(userData: SignInUserDto) {
    try {
      const existingUser = await this.userService.findOneByEmail(userData.email.toLowerCase());

      if (!existingUser) {
        throw new UnauthorizedException('Wrong password or email');
      }

      const isPasswordCorrect = await bcrypt.compare(userData.password, existingUser.password);

      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Wrong password or email');
      }

      return existingUser;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async logout(req: IRequestExtended, res: Response) {
    try {
      await this.tokenService.deleteTokenPair(req.user);

      res.status(HttpStatus.OK).json({ message: 'You are logout' });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async checkAccess(req: Request) {
    // check accessToken or refreshToken
    try {
      const Bearer = req.headers[constants.AUTHORIZATION].split(' ')[0];
      const token = req.headers[constants.AUTHORIZATION].split(' ')[1];

      if (!req.headers[constants.AUTHORIZATION] || !token || !Bearer) {
        throw new UnauthorizedException('No token');
      }

      const tokenPair = await this.tokenService.findTokenPair(token);

      if (!tokenPair) {
        throw new UnauthorizedException('Permission denied');
      }

      const { email } = (await this.tokenService.verifyToken(
        token,
        this.configService.get('JWT_SECRET_KEY'),
      )) as JwtPayload;
      const existingUser = await this.userService.findOneByEmail(email);

      if (!existingUser) {
        throw new UnauthorizedException('Permission denied');
      }

      return existingUser;
    } catch (e) {
      throw new UnauthorizedException(e.response?.error, e.message);
    }
  }

  async updateRefreshToken(req: IRequestExtended) {
    try {
      await this.tokenService.deleteTokenPair(req.user);

      const tokenPair = await this.tokenService.getTokenPair(req.user);

      const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

      return {
        accessToken,
        refreshToken,
        user: {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role,
        },
      };
    } catch (e) {
      throw new UnauthorizedException(e.response?.error, e.message);
    }
  }
}
