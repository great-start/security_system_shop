import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({ example: 'датчик', description: 'product type' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2', description: 'category Id' })
  @IsNumber()
  @IsNotEmpty()
  relatedCategoryId: number;
}
