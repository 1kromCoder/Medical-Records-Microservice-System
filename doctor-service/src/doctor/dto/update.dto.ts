import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
}
