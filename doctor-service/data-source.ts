import { DataSource } from 'typeorm';
import { Doctor } from './src/doctor/doctor.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'doctor_service',
  entities: [Doctor],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
