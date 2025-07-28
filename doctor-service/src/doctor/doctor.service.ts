import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      const existing = await this.doctorRepository.findOne({
        where: { email: createDoctorDto.email },
      });

      if (existing) {
        throw new RpcException('Email already exists');
      }

      const doctor = this.doctorRepository.create(createDoctorDto);
      return await this.doctorRepository.save(doctor);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException(error.message || 'Unexpected error');
    }
  }

  async findOne(id: number) {
    try {
      const doctor = await this.doctorRepository.findOne({ where: { id } });
      if (!doctor) {
        throw new RpcException('Doctor not found');
      }
      return doctor;
    } catch (error) {
      throw new RpcException(error.message || 'Unexpected error');
    }
  }

  async update(id: number, dto: UpdateDoctorDto) {
    try {
      const doctor = await this.findOne(id);

      if (dto.name !== undefined) {
        doctor.name = dto.name;
      }

      if (dto.email !== undefined) {
        doctor.email = dto.email;
      }

      const updatedDoctor = await this.doctorRepository.save(doctor);

      return {
        id: updatedDoctor.id,
        name: updatedDoctor.name,
        email: updatedDoctor.email,
      };
    } catch (error) {
      if (error.message === 'Doctor not found') {
        throw new RpcException('Doctor not found');
      }

      throw new RpcException(error.message || 'Unexpected error');
    }
  }

  async delete(id: number): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.findOne({ where: { id } });

      if (!doctor) {
        throw new RpcException('Doctor not found');
      }

      await this.doctorRepository.remove(doctor);

      return {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
      } as Doctor;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException(error.message || 'Unexpected error');
    }
  }

  async findAll(): Promise<Doctor[]> {
    try {
      return await this.doctorRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
