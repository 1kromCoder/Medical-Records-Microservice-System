import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './doctor.entity';
import { UpdateDoctorDto } from './dto/update.dto';

@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @GrpcMethod('DoctorService', 'CreateDoctor')
  createDoctor(data: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(data);
  }

  @GrpcMethod('DoctorService', 'FindOne')
  findOne({ id }: { id: number }) {
    return this.doctorService.findOne(id);
  }

  @GrpcMethod('DoctorService', 'UpdateDoctor')
  updateDoctor(data: UpdateDoctorDto) {
    return this.doctorService.update(data.id, data);
  }

  @GrpcMethod('DoctorService', 'DeleteDoctor')
  deleteDoctor({ id }: { id: number }) {
    return this.doctorService.delete(id);
  }

  @GrpcMethod('DoctorService', 'FindAllDoctors')
  async findAllDoctors(): Promise<{ doctors: Doctor[] }> {
    const doctors = await this.doctorService.findAll();
    return { doctors };
  }
}
