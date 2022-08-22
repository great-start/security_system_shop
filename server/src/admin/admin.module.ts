import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, AuthService, TokenService, UserService],
})
export class AdminModule {}
