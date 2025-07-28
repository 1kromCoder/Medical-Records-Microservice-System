import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';

export class UpdatePatientDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
  @ApiPropertyOptional({ example: '2025-07-21' })
  @IsOptional()
  @IsDateString()
  dob?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  doctorId?: number;
}
