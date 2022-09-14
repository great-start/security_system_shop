import { Controller, Post, Body, Req, Res, UseGuards, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/signUp.user.dto';
import { SignInUserDto } from './dto/signIn.user.dto';
import { Request, Response } from 'express';
import { IRequestExtended } from './models/requestExtended.interface';
import { JwtCheckGuard } from './guards/jwt-check.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthProfileDto } from './dto/google.auth.profile.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registration',
    description: 'Sign up user using data',
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
    summary: 'Sign in',
    description: 'Sign in user using email and password',
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

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  authGoogle() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthResponse(@Req() req: IRequestExtended, @Res() res: Response) {
    return this.authService.authGoogle(req.user, res);
  }

  @ApiOperation({
    summary: 'User LogOut',
    description: 'LogOut',
  })
  @ApiResponse({
    status: 200,
  })
  @Post('/logout')
  @UseGuards(JwtCheckGuard)
  logOut(@Req() req: IRequestExtended, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @ApiOperation({
    summary: 'RefreshToken',
    description: 'Refresh tokens using refresh token',
  })
  @ApiResponse({
    status: 200,
  })
  @Post('/refresh')
  @UseGuards(JwtCheckGuard)
  refresh(@Req() req: IRequestExtended) {
    return this.authService.updateRefreshToken(req);
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
