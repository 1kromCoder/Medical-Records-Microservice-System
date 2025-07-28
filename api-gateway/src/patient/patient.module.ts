import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATIENT',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(process.cwd(), 'proto/patient.proto'),
          url: 'localhost:3003',
        },
      },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
