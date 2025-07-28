import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example:"salom@gmail.com"})
  @IsEmail()
  email: string;
}
