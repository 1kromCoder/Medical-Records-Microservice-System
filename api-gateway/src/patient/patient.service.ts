import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreatePatientDto } from './dto/create-patient.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { Patient, PatientList } from './patient.interface';

interface PatientServiceGrpc {
  CreatePatient(data: CreatePatientDto): Observable<Patient>;
  FindAllPatients(data: {}): Observable<PatientList>;
  FindOnePatient(data: { id: number }): Observable<Patient>;
  UpdatePatient(data: {
    id: number;
    name?: string;
    dob?: string;
    doctorId?: number;
  }): Observable<any>;
  DeletePatient(data: { id: number }): Observable<any>;
}

@Injectable()
export class PatientService {
  private patientService: PatientServiceGrpc;

  constructor(@Inject('PATIENT') private client: ClientGrpc) {}

  onModuleInit() {
    this.patientService =
      this.client.getService<PatientServiceGrpc>('PatientService');
  }

  async create(data: CreatePatientDto) {
    try {
      return await lastValueFrom(this.patientService.CreatePatient(data));
    } catch (err) {
      if (err?.details === 'Doctor not found') {
        throw new NotFoundException('Doctor not found');
      }
      throw new InternalServerErrorException(
        err.details || 'Unexpected error from patient service',
      );
    }
  }

  async findAll(): Promise<Patient[]> {
    const response = await lastValueFrom(
      this.patientService.FindAllPatients({}),
    );
    return response.items || [];
  }

  async findOne(id: number) {
    try {
      return await lastValueFrom(this.patientService.FindOnePatient({ id }));
    } catch (err) {
      if (err?.details === 'Patient not found') {
        throw new NotFoundException('Patient not found');
      }
      throw new InternalServerErrorException(err.details || 'Unexpected error');
    }
  }

  async update(id: number, dto: any) {
    try {
      return await lastValueFrom(
        this.patientService.UpdatePatient({ id, ...dto }),
      );
    } catch (err) {
      if (err?.details === 'Patient not found') {
        throw new NotFoundException('Patient not found');
      }
      if (err?.details === 'Doctor not found') {
        throw new NotFoundException('Doctor not found');
      }
      throw new InternalServerErrorException(err.details || 'Unexpected error');
    }
  }

  async delete(id: number) {
    try {
      return await lastValueFrom(this.patientService.DeletePatient({ id }));
    } catch (err) {
      if (err?.details === 'Patient not found') {
        throw new NotFoundException('Patient not found');
      }
      throw new InternalServerErrorException(err.details || 'Unexpected error');
    }
  }
}
