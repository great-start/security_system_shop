import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: 'vanyaPetrov@gmail.com', description: 'email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'snruen$2n3n4iASAS', description: 'password' })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
