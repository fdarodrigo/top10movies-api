import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'chave-secreta-aqui',
    });
  }

  async validate(payload: any) {
    // Aqui você pode implementar a lógica para buscar o usuário no banco de dados
    // com base no payload do token
    // E retornar o usuário autenticado
    return { userId: payload.sub, username: payload.username };
  }
}
