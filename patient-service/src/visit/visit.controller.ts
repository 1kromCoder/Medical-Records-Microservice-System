import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';

@Controller()
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @GrpcMethod('VisitService', 'CreateVisit')
  async createVisit(data: CreateVisitDto) {
    const visit = await this.visitService.create(data);
    return formatVisit(visit);
  }

  @GrpcMethod('VisitService', 'FindAllVisits')
  async findAllVisits() {
    const visits = await this.visitService.findAll();
    return { items: visits.length ? visits.map(formatVisit) : [] };
  }

  @GrpcMethod('VisitService', 'FindOneVisit')
  async findOneVisit(data: { id: number }) {
    const visit = await this.visitService.findOne(data.id);
    return formatVisit(visit);
  }

  @GrpcMethod('VisitService', 'UpdateVisit')
  async updateVisit(data: {
    id: number;
    visitDate?: string;
    patientId?: number;
  }) {
    const visit = await this.visitService.update(data.id, data);
    return formatVisit(visit);
  }

  @GrpcMethod('VisitService', 'DeleteVisit')
  async deleteVisit(data: { id: number }) {
    const deleted = await this.visitService.delete(data.id);
    return formatVisit(deleted);
  }
}

function formatVisit(visit: any) {
  return {
    id: visit.id,
    visitDate: visit.visitDate,
    patientId: visit.patientId,
    patient: visit.patient
      ? {
          id: visit.patient.id,
          name: visit.patient.name,
          dob: visit.patient.dob,
          doctorId: visit.patient.doctorId,
        }
      : null,
  };
}
