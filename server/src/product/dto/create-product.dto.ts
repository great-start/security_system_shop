import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Vanya', description: 'product name' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1', description: 'product price' })
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiProperty({ example: '1', description: 'category id' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  typeId: number;

  @ApiProperty({ example: '1', description: 'type id' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  categoryId: number;

  @ApiProperty({ example: '100', description: 'product quantity' })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  quantity: number;
}
