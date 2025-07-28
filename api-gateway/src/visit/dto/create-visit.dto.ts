import { IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVisitDto {
  @ApiProperty({ example: '2025-07-21' })
  @IsDateString()
  visitDate: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  patientId: number;
}
