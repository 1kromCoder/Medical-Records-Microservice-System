import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsNotEmpty()
  text?: string;
  @IsOptional()
  @IsInt()
  visitId?: number;
}
