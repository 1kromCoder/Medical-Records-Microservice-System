import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    const result = await this.userService.findByEmail(dto.email).toPromise();

    if (!result?.user || !result.user.password) {
      throw new UnauthorizedException('Invalid credentials (user not found)');
    }

    const user = result.user;
    console.log(result.user);

    const isMatch = await bcrypt.compare(dto.password, result.user.password);
    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials (password mismatch)',
      );
    }

    const payload = { sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
