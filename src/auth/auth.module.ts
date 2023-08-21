import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secret: 'chave-secreta-aqui',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
