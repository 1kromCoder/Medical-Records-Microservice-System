import { Visit } from '../visit/visit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'patient' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dob: string;

  @Column()
  doctorId: number;


  @OneToMany(() => Visit, (visit) => visit.patient, { onDelete: 'CASCADE' })
  visits: Visit[];
}
