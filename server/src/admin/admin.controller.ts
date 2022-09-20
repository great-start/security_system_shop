import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/models/roles.enum';
import { IRequestExtended } from '../auth/models/requestExtended.interface';
import { Response } from 'express';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('personal')
  getPersonalData(@Req() req: IRequestExtended, @Res() res: Response) {
    return this.adminService.getPersonalData(req, res);
  }

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('personal')
  changePersonalData(
    @Req() req: IRequestExtended,
    @Body() data: UpdateUserDto,
    @Res() res: Response,
  ) {
    return this.adminService.changePersonalData(req, data, res);
  }

  // @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.adminService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
