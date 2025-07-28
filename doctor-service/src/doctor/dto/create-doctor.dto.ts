import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
}
