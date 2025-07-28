import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { VisitModule } from './visit/visit.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    VisitModule,
    NoteModule,
    ClientsModule.register([
      {
        name: 'VISIT',
        transport: Transport.GRPC,
        options: {
          package: 'visit',
          protoPath: join(__dirname, '../proto/visit.proto'),
          url: 'localhost:3003',
        },
      },
      {
        name: 'NOTE',
        transport: Transport.GRPC,
        options: {
          package: 'note',
          protoPath: join(__dirname, '../proto/note.proto'),
          url: 'localhost:3003',
        },
      },
      {
        name: 'DOCTOR',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(__dirname, '../proto/doctor.proto'),
          url: 'localhost:3001',
        },
      },
      {
        name: 'PATIENT',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(__dirname, '../proto/patient.proto'),
          url: 'localhost:3003',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
