import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma.service';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../auth/token.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaService,
    JwtCheckGuard,
    RolesGuard,
    AuthService,
    UserService,
    TokenService,
  ],
})
export class ProductModule {}
