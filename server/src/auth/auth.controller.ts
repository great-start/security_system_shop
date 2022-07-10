import { Controller, Post, Body, Req, Res, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/signUp.user.dto';
import { SignInUserDto } from './dto/signIn.user.dto';

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
  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
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
  @Post('/sing_in')
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
  logOut(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }
}
