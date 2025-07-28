import { DataSource } from 'typeorm';
import { Patient } from './src/patient/patient.entity';
import { Visit } from './src/visit/visit.entity';
import { Note } from './src/note/note.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'patient_service',
  synchronize: false,
  entities: [Patient, Visit, Note],
  migrations: ['./src/migrations/*.ts'],
});
