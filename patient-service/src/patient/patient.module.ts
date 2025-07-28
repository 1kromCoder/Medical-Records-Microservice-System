import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Visit } from 'src/visit/visit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Visit]),
    ClientsModule.register([
      {
        name: 'doctor_service',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(process.cwd(), 'proto/doctor.proto'),
          url: 'localhost:3001',
        },
      },
    ]),
  ],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
