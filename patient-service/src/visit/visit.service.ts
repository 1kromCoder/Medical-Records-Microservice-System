import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Patient } from 'src/patient/patient.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepo: Repository<Visit>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}
  async create(dto: CreateVisitDto): Promise<Visit> {
    try {
      const patient = await this.patientRepo.findOne({
        where: { id: dto.patientId },
      });
      if (!patient) throw new RpcException('Patient not found');
      

      const visit = this.visitRepo.create(dto);
      return await this.visitRepo.save(visit);
    } catch (error) {
      throw new RpcException(error.message || 'Create visit error');
    }
  }

  async findAll(): Promise<Visit[]> {
    try {
      return await this.visitRepo.find({ relations: ['notes', 'patient'] });
    } catch (error) {
      throw new RpcException(error.message || 'Find all visits error');
    }
  }

  async findOne(id: number): Promise<Visit> {
    try {
      const visit = await this.visitRepo.findOne({
        where: { id },
        relations: ['notes', 'patient'],
      });
      if (!visit) throw new RpcException('Visit not found');
      return visit;
    } catch (error) {
      throw new RpcException(error.message || 'Find visit error');
    }
  }

  async update(id: number, dto: Partial<CreateVisitDto>): Promise<Visit> {
    try {
      const visit = await this.findOne(id);

      if (dto.visitDate !== undefined) {
        visit.visitDate = dto.visitDate;
      }

      if (dto.patientId !== undefined) {
        const patient = await this.patientRepo.findOne({
          where: { id: dto.patientId },
        });
        if (!patient) throw new RpcException('Patient not found');
        visit.patientId = dto.patientId;
      }

      return await this.visitRepo.save(visit);
    } catch (error) {
      throw new RpcException(error.message || 'Update visit error');
    }
  }

  async delete(id: number): Promise<Visit> {
    try {
      const visit = await this.findOne(id);
      return await this.visitRepo.remove(visit);
    } catch (error) {
      throw new RpcException(error.message || 'Delete visit error');
    }
  }
}
