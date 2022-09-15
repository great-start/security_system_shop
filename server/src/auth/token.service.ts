import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ITokenPair } from './models/token.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  public async getTokenPair(user: User) {
    return this._generateTokenPair(user);
  }

  public async saveTokenPair(tokenPair: ITokenPair) {
    return this.prismaService.token.create({ data: tokenPair });
  }

  private _generateTokenPair(user: User) {
    const payload = { userId: user.id, email: user.email };
    const jwtSecretKey = this.configService.get('JWT_SECRET_KEY');
    const jwtAccessTime = this.configService.get<string>('JWT_ACCESS_TIME');
    const jwtRefreshTime = this.configService.get<string>('JWT_REFRESH_TIME');

    const accessToken = jwt.sign(payload, jwtSecretKey, {
      expiresIn: jwtAccessTime,
    });
    const refreshToken = jwt.sign(payload, jwtSecretKey, {
      expiresIn: jwtRefreshTime,
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

  public async verifyToken(token: string, secretKey: string) {
    return jwt.verify(token, secretKey);
  }

  public async decodeToken(token: string) {
    return jwt.decode(token);
  }

  async deleteTokenPair(user: User) {
    return this.prismaService.token.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }
}
