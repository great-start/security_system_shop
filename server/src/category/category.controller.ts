import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Get()
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
  findAllCategories() {
    return this.categoryService.findAll();
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
