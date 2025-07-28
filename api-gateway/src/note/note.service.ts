import {
  Injectable,
  Inject,
  OnModuleInit,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateNoteDto } from './dto/create-note.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { UpdateNoteDto } from './dto/update.note.dto';

interface NoteServiceGrpc {
  CreateNote(data: CreateNoteDto): Observable<any>;
  FindAllNotes(data: {}): Observable<any>;
  FindOneNote(data: { id: number }): Observable<any>;
  UpdateNote(data: {
    id: number;
    text?: string;
    visitId?: number;
  }): Observable<UpdateNoteDto>;
  DeleteNote(data: { id: number }): Observable<any>;
}

@Injectable()
export class NoteService implements OnModuleInit {
  private noteService: NoteServiceGrpc;

  constructor(@Inject('NOTE') private client: ClientGrpc) {}

  onModuleInit() {
    this.noteService = this.client.getService<NoteServiceGrpc>('NoteService');
  }

  async create(data: CreateNoteDto) {
    try {
      return await lastValueFrom(this.noteService.CreateNote(data));
    } catch (err) {
      if (err?.details === 'Visit not found') {
        throw new NotFoundException('Visit not found');
      }
      throw new InternalServerErrorException(err.details || 'Create error');
    }
  }

  async findAll() {
    try {
      const res = await lastValueFrom(this.noteService.FindAllNotes({}));
      return res?.items || [];
    } catch (err) {
      throw new InternalServerErrorException(err.details || 'Find all error');
    }
  }

  async findOne(id: number) {
    try {
      return await lastValueFrom(this.noteService.FindOneNote({ id }));
    } catch (err) {
      if (err?.details === 'Note not found') {
        throw new NotFoundException('Note not found');
      }
      throw new InternalServerErrorException(err.details || 'Find one error');
    }
  }

  async update(id: number, dto: any) {
    try {
      return await lastValueFrom(this.noteService.UpdateNote({ id, ...dto }));
    } catch (err) {
      if (err?.details === 'Note not found') {
        throw new NotFoundException('Note not found');
      }
      if (err?.details === 'Visit not found') {
        throw new NotFoundException('Visit not found');
      }
      throw new InternalServerErrorException(err.details || 'Update error');
    }
  }

  async delete(id: number) {
    try {
      return await lastValueFrom(this.noteService.DeleteNote({ id }));
    } catch (err) {
      if (err?.details === 'Note not found') {
        throw new NotFoundException('Note not found');
      }
      throw new InternalServerErrorException(err.details || 'Delete error');
    }
  }
}
