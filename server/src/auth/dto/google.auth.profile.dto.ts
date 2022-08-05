import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleAuthProfileDto {
  @ApiProperty({ example: 'vanyaPetrov@gmail.com', description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Vanya', description: 'user name' })
  @IsString()
  firstName: string;
}
