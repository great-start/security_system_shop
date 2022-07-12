import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { TokenService } from './token.service';
import { PrismaService } from '../prisma.service';
import { RefreshMiddleware } from './middlewares/refresh.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, TokenService, PrismaService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshMiddleware).forRoutes('auth/refresh');
  }
}
