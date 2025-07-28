import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  text: string;

  @IsInt()
  visitId: number;
}
