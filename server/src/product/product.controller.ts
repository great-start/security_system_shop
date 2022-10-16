import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MulterFileOptions } from '../utils/MulterFileOptions';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/models/roles.enum';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.ADMIN)
  // @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('image', MulterFileOptions))
  @Post('/')
  addNew(@Body() product: CreateProductDto, @UploadedFile() image: Express.Multer.File) {
    return this.productService.addNew(product, image?.path);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('/')
  @ApiQuery({
    name: 'typeId',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: Number,
  })
  findManySortedByType(@Query('typeId') typeId: number, @Query('categoryId') categoryId: number) {
    return this.productService.findManySortedBy(typeId, categoryId);
  }

  // @Get('/')
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(id);
  // }
}
