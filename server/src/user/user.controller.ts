import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { Role } from '../auth/models/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IOrder } from './models/order.inteface';
import { IRequestExtended } from '../auth/models/requestExtended.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('make-order')
  makeAnOrder(@Body() order: IOrder, @Req() req: IRequestExtended) {
    return this.userService.makeAnOrder(order, req);
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('order')
  getOrders(@Req() req: IRequestExtended) {
    return this.userService.getOrders(req);
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('personal')
  getPersonalData(@Req() req: IRequestExtended, @Res() res: Response) {
    return this.userService.getPersonalData(req, res);
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Patch('personal')
  changePersonalData(
    @Req() req: IRequestExtended,
    @Body() data: UpdateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.changePersonalData(req, data, res);
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Delete('order/:id')
  canselOrder(@Param('id') id: string) {
    return this.userService.canselOrder(+id);
  }
}
