import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdateVisitDto {
  @ApiPropertyOptional({ example: '2025-10-12' })
  @IsDateString()
  @IsOptional()
  visitDate?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  patientId?: number;
}
