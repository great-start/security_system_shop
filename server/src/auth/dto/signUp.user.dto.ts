import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpUserDto {
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

  @ApiProperty({ example: 'vanyaSidorov@gmail.com', description: 'user email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Vs78SID12nm', description: 'user password' })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;
}
