import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'Vanya', description: 'product name' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: '1', description: 'product price' })
  @IsNumber()
  @Min(1)
  price?: number;

  @ApiProperty({ example: '1', description: 'category id' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  typeId?: number;

  @ApiProperty({ example: '1', description: 'type id' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  categoryId?: number;

  @ApiProperty({ example: '100', description: 'product quantity' })
  @IsNumber()
  @Min(1)
  quantity?: number;
}
