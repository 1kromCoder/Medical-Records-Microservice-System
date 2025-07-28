import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Visit } from 'src/visit/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Visit])],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
