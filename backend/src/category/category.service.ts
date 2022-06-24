import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(category: CreateCategoryDto) {
    console.log(category);
    return this.prismaService.category.create({ data: category });
  }

  async findAll() {
    return this.prismaService.category.findMany();
  }

  async findProducts(category: string) {
    return this.prismaService.product.findMany({
      where: {
        category: {
          name: category,
        },
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
