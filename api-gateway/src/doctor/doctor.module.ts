import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DOCTOR',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(__dirname, '../../proto/doctor.proto'),
          url: 'localhost:3001',
        },
      },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
