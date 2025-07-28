
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './user.interface';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    try {
      return await this.userService.createUser(dto);
    } catch (error) {
      if (
        error.message.includes('already exists') ||
        error.message.includes('duplicate key value')
      ) {
        throw new BadRequestException('Email already exists');
      }

      throw error;
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
