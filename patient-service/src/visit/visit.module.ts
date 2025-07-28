import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { Note } from 'src/note/note.entity';
import { Patient } from 'src/patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Note, Patient])],
  providers: [VisitService],
  controllers: [VisitController],
})
export class VisitModule {}
