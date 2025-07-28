import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserDto) {
    const user = await this.userService.create(data);
    return { user };
  }
  @GrpcMethod('UserService', 'FindAll')
  async findAll(_: any, __: any) {
    const users = await this.userService.findAll();
    return { items: users };
  }
  @GrpcMethod('UserService', 'FindByEmail')
  async findByEmail(data: { email: string }) {
    const user = await this.userService.findByEmail(data.email);
    return { user };
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(data: { id: number }) {
    const user = await this.userService.findOne(data.id);
    return { user };
  }
}
