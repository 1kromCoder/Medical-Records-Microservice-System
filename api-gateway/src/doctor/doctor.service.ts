import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { lastValueFrom, Observable } from 'rxjs';

interface DoctorServiceGrpc {
  CreateDoctor(data: CreateDoctorDto): Observable<any>;
  FindAllDoctors(data: {}): Observable<any>;
  FindOne(data: { id: number }): Observable<any>;
  UpdateDoctor(data: {
    id: number;
    name: string;
    email: string;
  }): Observable<any>;
  DeleteDoctor(data: { id: number }): Observable<any>;
}

@Injectable()
export class DoctorService {
  private doctorService: DoctorServiceGrpc;

  constructor(@Inject('DOCTOR') private client: ClientGrpc) {}

  onModuleInit() {
    this.doctorService =
      this.client.getService<DoctorServiceGrpc>('DoctorService');
  }

  async findOne(id: number) {
    try {
      const doctor = await lastValueFrom(this.doctorService.FindOne({ id }));
      return doctor;
    } catch (error) {
      if (error?.details === 'Doctor not found') {
        throw new NotFoundException('Doctor not found');
      }
      throw new InternalServerErrorException(error.details || 'Unknown error');
    }
  }

  async update(id: number, dto: any) {
    try {
      return await lastValueFrom(
        this.doctorService.UpdateDoctor({ id, ...dto }),
      );
    } catch (error) {
      if (error?.details === 'Doctor not found') {
        throw new NotFoundException('Doctor not found');
      }
      throw new InternalServerErrorException(
        error.details || 'Internal server error',
      );
    }
  }

  async delete(id: number) {
    try {
      return await lastValueFrom(this.doctorService.DeleteDoctor({ id }));
    } catch (error) {
      if (error?.details === 'Doctor not found') {
        throw new NotFoundException('Doctor not found');
      }
      throw new InternalServerErrorException(
        error.details || 'Internal server error',
      );
    }
  }

  async create(data: CreateDoctorDto) {
    try {
      return await lastValueFrom(this.doctorService.CreateDoctor(data));
    } catch (error) {
      if (error?.details === 'Email already exists') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException(
        error.details || 'Internal server error',
      );
    }
  }

  findAll() {
    return this.doctorService.FindAllDoctors({});
  }
}
