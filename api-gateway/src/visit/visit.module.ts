import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VISIT',
        transport: Transport.GRPC,
        options: {
          package: 'visit',
          protoPath: join(process.cwd(), 'proto/visit.proto'),
          url: 'localhost:3003', 
        },
      },
    ]),
  ],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
