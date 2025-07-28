import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './user.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    return this.userService.findAll();
  }
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
