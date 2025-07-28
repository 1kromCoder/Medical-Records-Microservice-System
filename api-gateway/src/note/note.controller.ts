import { Controller, Post, Get, Body, Delete, Patch, Param, NotFoundException } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateNoteDto } from './dto/update.note.dto';

@ApiTags('Note')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.noteService.create(dto);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const note = await this.noteService.findOne(+id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.noteService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noteService.delete(+id);
  }
}
