import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password: string;
  @ApiProperty({ example: 'DOCTOR' })
  @IsEnum(UserRole)
  role: UserRole;
}
