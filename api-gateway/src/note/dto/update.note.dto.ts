import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({ example: 'Mening ismim ikromxon' })
  @IsOptional()
  @IsNotEmpty()
  text?: string;
  @ApiProperty({ example: '1' })
  @IsOptional()
  @IsInt()
  visitId?: number;
}
