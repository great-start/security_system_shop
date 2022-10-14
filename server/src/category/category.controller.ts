import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtCheckGuard } from '../auth/guards/jwt-check.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/models/roles.enum';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtCheckGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/')
  create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @ApiOperation({ summary: 'Get products by category' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: '1',
          name: 'surveillance',
          createdAt: '2022-06-24T14:08:24.924Z',
        },
      ],
    },
  })
  @Get(':category')
  findProductsByCategory(@Param('category') category: string) {
    return this.categoryService.findProducts(category);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: '1',
          name: 'surveillance',
          createdAt: '2022-06-24T14:08:24.924Z',
        },
      ],
    },
  })
  @Get('')
  getAllCategories() {
    return this.categoryService.getAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
