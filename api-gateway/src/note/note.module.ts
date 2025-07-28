import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTE',
        transport: Transport.GRPC,
        options: {
          package: 'note',
          protoPath: join(__dirname, '../../proto/note.proto'),
          url: 'localhost:3003',
        },
      },
    ]),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
