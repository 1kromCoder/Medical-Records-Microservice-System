import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDoctorDto } from './dto/update.dto';
import { lastValueFrom } from 'rxjs';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Doctor')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }
  @Get()
  async findAll() {
    try {
      const response = await lastValueFrom(this.doctorService.findAll());
      return response.items || [];
    } catch (error) {
      throw new InternalServerErrorException(
        error.details || 'Internal server error',
      );
    }
  }
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.doctorService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(+id, dto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.doctorService.delete(+id);
  }
}
