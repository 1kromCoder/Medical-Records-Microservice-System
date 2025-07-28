import {
  Injectable,
  Inject,
  OnModuleInit,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateVisitDto } from './dto/create-visit.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { UpdateVisitDto } from './dto/update.visit.dto';

interface VisitServiceGrpc {
  CreateVisit(data: CreateVisitDto): Observable<Visit>;
  FindAllVisits(data: {}): Observable<VisitList>;
  FindOneVisit(data: { id: number }): Observable<Visit>;
  UpdateVisit(data: UpdateVisitDto): Observable<Visit>;
  DeleteVisit(data: { id: number }): Observable<Visit>;
}

@Injectable()
export class VisitService implements OnModuleInit {
  private visitService: VisitServiceGrpc;

  constructor(@Inject('VISIT') private client: ClientGrpc) {}

  onModuleInit() {
    this.visitService =
      this.client.getService<VisitServiceGrpc>('VisitService');
  }

  async create(data: CreateVisitDto) {
    try {
      return await lastValueFrom(this.visitService.CreateVisit(data));
    } catch (err) {
      if (err?.details === 'Patient not found') {
        throw new NotFoundException('Patient not found');
      }
      throw new InternalServerErrorException(err.details || 'Create error');
    }
  }

  async findAll(): Promise<Visit[]> {
    const result = await lastValueFrom(this.visitService.FindAllVisits({}));
    return result.items || [];
  }

  async findOne(id: number): Promise<Visit> {
    try {
      return await lastValueFrom(this.visitService.FindOneVisit({ id }));
    } catch (error) {
      if (error?.details === 'Visit not found') {
        throw new NotFoundException('Visit not found');
      }
      throw new InternalServerErrorException(error.details || 'Unknown error');
    }
  }

  async update(id: number, dto: any): Promise<Visit> {
    try {
      return await lastValueFrom(this.visitService.UpdateVisit({ id, ...dto }));
    } catch (error) {
      if (error?.details === 'Visit not found') {
        throw new NotFoundException('Visit not found');
      }
      throw new InternalServerErrorException(error.details || 'Unknown error');
    }
  }

  async delete(id: number): Promise<Visit> {
    try {
      return await lastValueFrom(this.visitService.DeleteVisit({ id }));
    } catch (error) {
      if (error?.details === 'Visit not found') {
        throw new NotFoundException('Visit not found');
      }
      throw new InternalServerErrorException(error.details || 'Unknown error');
    }
  }
}
