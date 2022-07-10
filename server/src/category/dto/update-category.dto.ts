import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ example: 'surveillance', description: 'category of products' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  name: string;
}
