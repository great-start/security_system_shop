import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async addNew(product: CreateProductDto, filename?: string) {
    return this.prismaService.product.create({
      data: {
        ...product,
        image: filename || null,
      },
    });
  }

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  async findAllOneByTypeId(typeId: number) {
    return this.prismaService.product.findMany({
      where: {
        typeId,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
