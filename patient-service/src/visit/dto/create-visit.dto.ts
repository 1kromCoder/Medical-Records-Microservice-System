import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateVisitDto {
  @IsDateString()
  visitDate: string;

  @IsInt()
  patientId: number;
}
