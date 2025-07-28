import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Observable } from 'rxjs';

export interface Doctor {
  id: number;
  name: string;
  email: string;
}

interface DoctorService {
  FindOne(data: { id: number }): Observable<Doctor>;
}

@Injectable()
export class PatientService {
  private doctorService: any;

  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @Inject('doctor_service')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.doctorService = this.client.getService<DoctorService>('DoctorService');
  }

  async create(dto: CreatePatientDto): Promise<Patient> {
    try {
      const doctor: Doctor = await this.doctorService
        .FindOne({ id: dto.doctorId })
        .toPromise();

      if (!doctor?.id) {
        throw new RpcException('Doctor not found');
      }

      const patient = this.patientRepo.create(dto);
      return await this.patientRepo.save(patient);
    } catch (error) {
      throw new RpcException(error.message || 'Create patient error');
    }
  }
  async findAll(): Promise<Patient[]> {
    const all = await this.patientRepo.find({ relations: ['visits'] });
    return all;
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['visits'],
    });

    if (!patient) {
      throw new RpcException('Patient not found');
    }

    return patient;
  }

  async update(
    id: number,
    dto: { name?: string; dob?: string; doctorId?: number },
  ): Promise<Patient> {
    const patient = await this.findOne(id);

    if (dto.name !== undefined) {
      patient.name = dto.name;
    }

    if (dto.dob !== undefined) {
      patient.dob = dto.dob;
    }

    if (dto.doctorId !== undefined) {
      try {
        const doctor: Doctor = await this.doctorService
          .FindOne({ id: dto.doctorId })
          .toPromise();

        if (!doctor?.id) {
          throw new RpcException('Doctor not found');
        }

        patient.doctorId = dto.doctorId;
      } catch (error) {
        throw new RpcException('Doctor not found');
      }
    }

    return this.patientRepo.save(patient);
  }

  async delete(id: number): Promise<Patient> {
    const patient = await this.findOne(id);
    return this.patientRepo.remove(patient);
  }
}
