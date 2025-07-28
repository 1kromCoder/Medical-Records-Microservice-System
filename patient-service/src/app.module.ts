import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { PatientModule } from './patient/patient.module';
import { VisitModule } from './visit/visit.module';
import { NoteModule } from './note/note.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    PatientModule,
    VisitModule,
    NoteModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
