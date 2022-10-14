import { Module } from '@nestjs/common';

import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { PrismaService } from '../prisma.service';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../auth/token.service';

@Module({
  controllers: [TypeController],
  providers: [
    TypeService,
    PrismaService,
    JwtCheckGuard,
    RolesGuard,
    AuthService,
    UserService,
    TokenService,
  ],
})
export class TypeModule {}
