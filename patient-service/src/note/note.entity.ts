import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Visit } from '../visit/visit.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  visitId: number;

  @ManyToOne(() => Visit, (visit) => visit.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'visitId' })
  visit: Visit;
}
