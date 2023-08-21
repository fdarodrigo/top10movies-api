import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  generateToken(userId: string): string {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  validateToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    // Aqui você deve implementar a lógica para buscar e validar o usuário no banco de dados
    // Verifique se o username e password correspondem a um usuário real
    // Retorne o usuário encontrado ou null se não encontrado ou inválido
    const user = await this.userService.findByUsername(username);

    if (user && user.password === password) {
      // Se as credenciais forem válidas, retorne o usuário
      return user;
    }

    return null; // Credenciais inválidas
  }
}
