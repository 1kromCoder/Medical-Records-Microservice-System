import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePatientDto } from './dto/update.patient.dto';

@ApiTags('Patient')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientService.create(dto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll() || [];
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const patient = await this.patientService.findOne(+id);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.patientService.delete(+id);
  }
}
