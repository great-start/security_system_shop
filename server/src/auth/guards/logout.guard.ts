import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      await this.authService.checkAccess(req);

      return true;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
