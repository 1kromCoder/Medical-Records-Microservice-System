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
        package: ['doctor', 'user'],
        protoPath: [
          join(process.cwd(), 'proto/doctor.proto'),
          join(process.cwd(), 'proto/user.proto'),
        ],
        url: 'localhost:3001',
      },
    },
  );

  await app.listen();
}
bootstrap();
