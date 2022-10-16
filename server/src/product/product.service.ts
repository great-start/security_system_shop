import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { IProduct } from './models/product.interface';

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

  // async findAll() {
  //   return this.prismaService.product.findMany();
  // }

  async findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  async findManySortedBy(typeId: number, categoryId: number): Promise<IProduct[]> {
    let foundedProducts;

    console.log(typeId, categoryId);

    if (!typeId && !categoryId) {
      foundedProducts = await this.prismaService.product.findMany();
    }

    if (typeId) {
      foundedProducts = await this.prismaService.product.findMany({
        where: { typeId },
      });
    }

    if (categoryId) {
      // foundedProducts = await this.prismaService.category.findMany({
      //   where: {
      //     id: categoryId,
      //   },
      //   include: {
      //     Type: {
      //       include: {
      //         Product: true,
      //       },
      //     },
      //   },
      // });

      foundedProducts = await this.prismaService.product.findMany({
        // include: {
        //   type: {
        //     select: {
        //       categoryId: true,
        //     },
        //   },
        // },
        where: {
          type: {
            categoryId,
          },
        },
      });
    }

    if (!foundedProducts.length) {
      throw new NotFoundException('No products in this type or category');
    }

    console.log(foundedProducts);

    return foundedProducts;
  }

  // async update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }
  //
  // async remove(id: string) {
  //   return this.prismaService.product.delete({ where: { id } });
  // }
}
