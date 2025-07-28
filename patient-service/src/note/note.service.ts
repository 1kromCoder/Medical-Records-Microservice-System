import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { RpcException } from '@nestjs/microservices';
import { Visit } from 'src/visit/visit.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
    @InjectRepository(Visit)
    private visitRepo: Repository<Visit>,
  ) {}

  async create(dto: CreateNoteDto): Promise<Note> {
    try {
      const visit = await this.visitRepo.findOne({
        where: { id: dto.visitId },
      });
      if (!visit) throw new RpcException('Visit not found');

      const note = this.noteRepo.create(dto);
      return await this.noteRepo.save(note);
    } catch (error) {
      throw new RpcException(error.message || 'Create note error');
    }
  }
  async findOne(id: number): Promise<Note> {
    try {
      const note = await this.noteRepo.findOne({ where: { id } });
      if (!note) throw new RpcException('Note not found');
      return note;
    } catch (error) {
      throw new RpcException(error.message || 'Find note error');
    }
  }

  async update(id: number, dto: Partial<CreateNoteDto>): Promise<Note> {
    try {
      const note = await this.findOne(id);

      if (dto.text !== undefined) {
        note.text = dto.text;
      }

      if (dto.visitId !== undefined) {
        const visit = await this.visitRepo.findOne({
          where: { id: dto.visitId },
        });
        if (!visit) throw new RpcException('Visit not found');
        note.visitId = dto.visitId;
      }

      return await this.noteRepo.save(note);
    } catch (error) {
      throw new RpcException(error.message || 'Update note error');
    }
  }
  async findAll(): Promise<Note[]> {
    try {
      return await this.noteRepo.find();
    } catch (error) {
      throw new RpcException(error.message || 'Find all notes error');
    }
  }
  async delete(id: number): Promise<Note> {
    try {
      const note = await this.findOne(id);
      return await this.noteRepo.remove(note);
    } catch (error) {
      throw new RpcException(error.message || 'Delete note error');
    }
  }
}
