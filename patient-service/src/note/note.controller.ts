import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @GrpcMethod('NoteService', 'CreateNote')
  createNote(data: CreateNoteDto): Promise<Note> {
    return this.noteService.create(data);
  }

  @GrpcMethod('NoteService', 'FindAllNotes')
  async findAllNotes(_: any, __: any): Promise<{ items: Note[] }> {
    const items = await this.noteService.findAll();
    return { items };
  }

  @GrpcMethod('NoteService', 'FindOneNote')
  findOneNote(data: { id: number }): Promise<Note> {
    return this.noteService.findOne(data.id);
  }

  @GrpcMethod('NoteService', 'UpdateNote')
  updateNote(data: {
    id: number;
    text?: string;
    visitId?: number;
  }): Promise<Note> {
    return this.noteService.update(data.id, data);
  }

  @GrpcMethod('NoteService', 'DeleteNote')
  deleteNote(data: { id: number }): Promise<Note> {
    return this.noteService.delete(data.id);
  }
}
