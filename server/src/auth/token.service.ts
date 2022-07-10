import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { constants } from '../constants';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ITokenPair } from './interface/token.interface';

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getTokenPair(user: User) {
    return this._generateTokenPair(user);
  }

  public async saveTokenPair(tokenPair: ITokenPair) {
    return this.prismaService.token.create({ data: tokenPair });
  }

  private _generateTokenPair(user: User) {
    const payload = { userId: user.id, email: user.email };
    const accessToken = jwt.sign(payload, constants.JWT_SECRET_KEY, {
      expiresIn: constants.JWT_ACCESSTOKEN_TIME,
    });
    const refreshToken = jwt.sign(payload, constants.JWT_SECRET_KEY, {
      expiresIn: constants.JWT_REFRESHTOKEN_TIME,
    });
    return { accessToken, refreshToken, userId: user.id };
  }

  public async findTokenPair(token: string) {
    return this.prismaService.token.findFirst({
      where: {
        OR: [{ accessToken: token }, { refreshToken: token }],
      },
    });
  }

  public async verifyToken(token: string) {
    return jwt.verify(token, constants.JWT_SECRET_KEY);
  }
}
