import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      req.user = await this.authService.checkAccess(req);

      return true;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
