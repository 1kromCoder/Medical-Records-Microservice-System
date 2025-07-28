import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.interface';

interface UserServiceGrpc {
  CreateUser(data: CreateUserDto): Observable<{ user: User }>;
  FindByEmail(data: { email: string }): Observable<{ user: User }>;
  FindOne(data: { id: number }): Observable<{ user: User }>;
  FindAll(data: {}): any;
}

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(@Inject('USER') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  createUser(dto: CreateUserDto): Observable<{ user: User }> {
    return this.userService.CreateUser(dto);
  }
  findByEmail(email: string): Observable<{ user: User }> {
    return this.userService.FindByEmail({ email });
  }
  async findAll(): Promise<User[]> {
    const response: { items: User[] } = await lastValueFrom(
      this.userService.FindAll({}),
    );
    return response.items;
  }
  findOne(id: number): Observable<{ user: User }> {
    return this.userService.FindOne({ id });
  }
}
