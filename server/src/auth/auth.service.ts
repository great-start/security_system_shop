import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDto } from './dto/signUp.user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { SignInUserDto } from './dto/signIn.user.dto';
import { Response } from 'express';
import { constants } from '../constants';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(user: SignUpUserDto) {
    try {
      const userInDB = await this.userService.findOneByEmail(user.email);

      if (userInDB) {
        throw new HttpException('User has already exist', HttpStatus.BAD_REQUEST);
      }

      const hashPass = await bcrypt.hash(user.password, 7);
      const savedUser = await this.userService.saveUserToDB({ ...user, password: hashPass });

      const tokenPair = await this.tokenService.getTokenPair(savedUser);

      const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

      return { accessToken, refreshToken };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async signIn(userData: SignInUserDto) {
    try {
      const userFromDB = await this._validateUser(userData);

      const tokenPair = await this.tokenService.getTokenPair(userFromDB);

      const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

      return { accessToken, refreshToken };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  private async _validateUser(userData: SignInUserDto) {
    try {
      const userFromDB = await this.userService.findOneByEmail(userData.email);

      if (!userFromDB) {
        throw new UnauthorizedException('Wrong password or email');
      }

      const check = await bcrypt.compare(userFromDB.password, userData.password);

      if (!check) {
        throw new UnauthorizedException('Wrong password or email');
      }

      return userFromDB;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const accessToken = req.headers[constants.AUTHORIZATION].split(' ')[1];

      if (!accessToken) {
        throw new UnauthorizedException('No token');
      }

      const tokenPair = await this.tokenService.findTokenPair(accessToken);

      if (!tokenPair) {
        throw new UnauthorizedException('Token not valid');
      }

      const { email } = (await this.tokenService.verifyToken(accessToken)) as JwtPayload;
      const userFromDB = await this.userService.findOneByEmail(email);

      if (!userFromDB) {
        throw new UnauthorizedException('Token not valid');
      }

      res.status(HttpStatus.OK).json({ message: 'You are logged out' });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
