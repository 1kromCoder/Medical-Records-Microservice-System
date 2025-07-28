import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateVisitDto } from './dto/update.visit.dto';

@ApiTags('Visit')
@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  create(@Body() dto: CreateVisitDto) {
    return this.visitService.create(dto);
  }

  @Get()
  findAll(): Promise<Visit[]> {
    return this.visitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.visitService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVisitDto) {
    return this.visitService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.visitService.delete(id);
  }
}
