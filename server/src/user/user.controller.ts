import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { Role } from '../auth/models/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IOrder } from './models/order.inteface';

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
  @Get('/:id')
  findOne(@Param('id') id: string) {
    // return this.userService.findOne(+id);
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/order')
  makeAnOrder(@Body() order: IOrder) {
    return this.userService.makeAnOrder(order);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
