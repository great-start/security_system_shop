import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards, HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/signUp.user.dto';
import { SignInUserDto } from './dto/signIn.user.dto';
import { Response } from 'express';
import { IRequestExtended } from './interface/requestExtended.interface';
import { LogoutGuard } from './guards/logout.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign up user using data',
    description: 'Registration',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        accessToken: 'asd234vdce5te5b123vqfve5tb5t',
        refreshToken: 'asd234vdce5te5b123vqfve5tb5t',
      },
    },
  })
  @ApiBody({ type: SignUpUserDto })
  @Post('/sign-up')
  singUp(@Body() user: SignUpUserDto) {
    return this.authService.signUp(user);
  }

  @ApiOperation({
    summary: 'Sign in user using email and password',
    description: 'Sign in',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        accessToken: 'asd234vdce5te5b123vqfve5tb5t',
        refreshToken: 'asd234vdce5te5b123vqfve5tb5t',
      },
    },
  })
  @ApiBody({ type: SignInUserDto })
  @Post('/sign-in')
  signIn(@Body() authUser: SignInUserDto) {
    return this.authService.signIn(authUser);
  }

  @ApiOperation({
    summary: 'User LogOut',
    description: 'LogOut',
  })
  @ApiResponse({
    status: 200,
  })
  @Post('/logout')
  @UseGuards(LogoutGuard)
  logOut(@Req() req: IRequestExtended, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @ApiOperation({
    summary: 'User LogOut',
    description: 'LogOut',
  })
  @ApiResponse({
    status: 200,
  })
  @Post('/refresh')
  refresh(@Req() req: IRequestExtended, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @ApiOperation({
    summary: 'User Auth check',
    description: 'Check is user auth',
  })
  @ApiResponse({
    status: 200,
  })
  @Post('/check')
  async checkAuth(@Req() req: IRequestExtended, @Res() res: Response) {
    await this.authService.checkAccess(req);
    res.status(HttpStatus.OK).json({ message: 'Permission granted' });
  }
}
