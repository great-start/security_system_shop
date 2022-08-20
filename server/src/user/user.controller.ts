import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { Role } from '../auth/models/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IOrder } from './models/order.inteface';
import { IRequestExtended } from '../auth/models/requestExtended.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('make-order')
  makeAnOrder(@Body() order: IOrder, @Req() req: IRequestExtended) {
    return this.userService.makeAnOrder(order, req);
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('order')
  getAllOrders(@Req() req: IRequestExtended) {
    return this.userService.getAllOrders(req);
  }

  // @UseGuards(JwtCheckGuard, RolesGuard)
  // @Roles(Role.USER)
  // @Get('/:id')
  // findOne(@Param('id') id: string) {
  //   // return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Delete('order/:id')
  canselOrder(@Param('id') id: string) {
    return this.userService.canselOrder(+id);
  }
}
