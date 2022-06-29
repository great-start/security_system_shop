import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({ example: 'датчик', description: 'product type' })
  @IsString()
  @Length(2, 40)
  @IsNotEmpty()
  name: string;
}
