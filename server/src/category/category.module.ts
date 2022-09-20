import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../prisma.service';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { AuthService } from '../auth/auth.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/user.service';
import { TokenService } from '../auth/token.service';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    JwtCheckGuard,
    RolesGuard,
    AuthService,
    UserService,
    TokenService,
  ],
})
export class CategoryModule {}
