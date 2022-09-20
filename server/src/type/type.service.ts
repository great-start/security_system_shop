import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from '../prisma.service';
import { DateFormat } from '../utils/date.format';

@Injectable()
export class TypeService {
  constructor(private readonly prismaService: PrismaService) {}

  create(type: CreateTypeDto) {
    return this.prismaService.type.create({ data: type });
  }

  async findAll() {
    try {
      const types = await this.prismaService.type.findMany();
      types.forEach((type) => DateFormat.formatData(type));
      return types;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
