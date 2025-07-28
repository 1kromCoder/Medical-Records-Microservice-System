import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategis/jwt.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    JwtModule.register({
      secret: 'salom',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
