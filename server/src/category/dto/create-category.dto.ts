import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'surveillance', description: 'category of products' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  name: string;
}
