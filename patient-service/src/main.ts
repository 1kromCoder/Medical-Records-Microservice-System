import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['patient', 'visit', 'note'],
        protoPath: [
          join(process.cwd(), 'proto/patient.proto'),
          join(process.cwd(), 'proto/visit.proto'),
          join(process.cwd(), 'proto/note.proto'),
        ],
        url: 'localhost:3003',
      },
    },
  );
  await app.listen();
}
bootstrap();
