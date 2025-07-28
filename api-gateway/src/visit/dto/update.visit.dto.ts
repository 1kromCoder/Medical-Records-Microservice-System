import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdateVisitDto {
  @ApiPropertyOptional({ example: '2025-10-12' })
  @IsOptional()
  @IsDateString()
  visitDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  patientId?: number;
}
