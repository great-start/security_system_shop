import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/models/roles.enum';

@ApiTags('type')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/')
  create(@Body() type: CreateTypeDto) {
    return this.typeService.create(type);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update(+id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove(+id);
  }
}
