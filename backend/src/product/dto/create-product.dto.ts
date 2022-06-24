import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Vanya', description: 'user name' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1', description: 'category id' })
  @IsNumber()
  @Min(1)
  price?: number;

  @ApiProperty({ example: 'surveillance', description: 'category of products' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  status?: string;

  @ApiProperty({ example: '1', description: 'category id' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  typeId: number;
  categoryId: number;
  quantity?: number;
}
