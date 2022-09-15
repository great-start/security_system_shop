import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../token.service';
import { NextFunction, Response } from 'express';
import { UserService } from '../../user/user.service';
import { IRequestExtended } from '../models/requestExtended.interface';
import { constants } from '../../constants';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class RefreshMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService, private userService: UserService) {}

  async use(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers[constants.AUTHORIZATION].split(' ')[1];

      if (!refreshToken) {
        throw new UnauthorizedException('No token');
      }

      const tokenPair = await this.tokenService.findTokenPair(refreshToken);

      if (!tokenPair) {
        throw new UnauthorizedException('Token not valid');
      }

      const { email } = (await this.tokenService.verifyToken(
        refreshToken,
        constants.JWT_SECRET_KEY,
      )) as JwtPayload;
      const existingUser = await this.userService.findOneByEmail(email);

      if (!existingUser) {
        throw new UnauthorizedException('Token validation failed');
      }

      req.user = existingUser;
      next();
    } catch (e) {
      throw new UnauthorizedException({ message: e.message });
    }
  }
}
