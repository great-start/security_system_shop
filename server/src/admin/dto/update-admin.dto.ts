import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'Vanya', description: 'user firstName' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;

  @ApiProperty({ example: 'Sidorov', description: 'user lastName' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;
}
