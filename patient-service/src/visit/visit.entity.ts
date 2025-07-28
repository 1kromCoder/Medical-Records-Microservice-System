import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Note } from '../note/note.entity';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  visitDate: string;

  @Column()
  patientId: number;

  @ManyToOne(() => Patient, (patient) => patient.visits, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @OneToMany(() => Note, (note) => note.visit, { onDelete: 'CASCADE' })
  notes: Note[];
}
