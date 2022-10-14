import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';
import { DateFormat } from '../utils/date.format';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(category: CreateCategoryDto) {
    try {
      const newCategory = await this.prismaService.category.create({ data: category });
      return newCategory;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll() {
    try {
      const categories = await this.prismaService.category.findMany();
      categories.forEach((type) => DateFormat.formatData(type));
      return categories;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findProducts(category: string) {
    const findCategory = await this.prismaService.category.findUnique({
      where: {
        name: category,
      },
    });

    if (!findCategory) {
      throw new NotFoundException('Page not Found');
    }

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
