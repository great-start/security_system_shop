import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TypeService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTypeDto: CreateTypeDto) {
    return 'This action adds a new type';
  }

  findAll() {
    return this.prismaService.type.findMany();
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
