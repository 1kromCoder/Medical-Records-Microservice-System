import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDoctorDto {
  @ApiPropertyOptional({ example: 'alex' })
  @IsNotEmpty()
  name?: string;
  @ApiPropertyOptional({ example: 'example@gmail.com' })
  @IsEmail()
  email?: string;
}
