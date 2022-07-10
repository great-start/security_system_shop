import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({ example: 'Vanya', description: 'user firstName' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Sidorov', description: 'user lastName' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'vanyaSidorov@gmail.com', description: 'user email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Vs78SID12nm', description: 'user password' })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
