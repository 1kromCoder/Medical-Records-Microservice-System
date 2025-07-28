import { IsNotEmpty, IsInt, IsDateString, IsString, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsDateString()
  dob: string;
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
}
