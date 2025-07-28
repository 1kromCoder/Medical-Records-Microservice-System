import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Patch,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateNoteDto } from './dto/update.note.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Note')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR', 'ADMIN')
  create(@Body() dto: CreateNoteDto) {
    return this.noteService.create(dto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR', 'ADMIN', 'USER')
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR', 'ADMIN', 'USER')
  async findOne(@Param('id') id: string) {
    const note = await this.noteService.findOne(+id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR', 'ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.noteService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR', 'ADMIN')
  delete(@Param('id') id: string) {
    return this.noteService.delete(+id);
  }
}
