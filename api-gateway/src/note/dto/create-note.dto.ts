import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Mening ismim ikromxon' })
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  visitId: number;
}
