import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), DoctorModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
