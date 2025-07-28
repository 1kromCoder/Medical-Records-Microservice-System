import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-07-21' })
  @IsDateString()
  dob: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  doctorId: number;
}
