import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod('PatientService', 'CreatePatient')
  async createPatient(data: CreatePatientDto) {
    const patient = await this.patientService.create(data);
    return {
      id: patient.id,
      name: patient.name,
      dob: patient.dob,
      doctorId: patient.doctorId,
    };
  }

  @GrpcMethod('PatientService', 'FindAllPatients')
  async findAll() {
    const patients = await this.patientService.findAll();
    return {
      patients: patients.map((p) => ({
        id: p.id,
        name: p.name,
        dob: p.dob,
        doctorId: p.doctorId,
        visits: (p.visits || []).map((v) => ({
          id: v.id,
          visitDate: v.visitDate,
          patientId: v.patientId,
        })),
      })),
    };
  }

  @GrpcMethod('PatientService', 'FindOnePatient')
  async findOne({ id }: { id: number }) {
    const patient = await this.patientService.findOne(id);
    return {
      id: patient.id,
      name: patient.name,
      dob: patient.dob,
      doctorId: patient.doctorId,
    };
  }

  @GrpcMethod('PatientService', 'UpdatePatient')
  async update(data: {
    id: number;
    name?: string;
    dob?: string;
    doctorId?: number;
  }) {
    const patient = await this.patientService.update(data.id, data);
    return {
      id: patient.id,
      name: patient.name,
      dob: patient.dob,
      doctorId: patient.doctorId,
    };
  }

  @GrpcMethod('PatientService', 'DeletePatient')
  async delete({ id }: { id: number }) {
    const patient = await this.patientService.delete(id);
    return {
      id: patient.id,
      name: patient.name,
      dob: patient.dob,
      doctorId: patient.doctorId,
    };
  }
}
