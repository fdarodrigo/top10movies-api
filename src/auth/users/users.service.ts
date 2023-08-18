// auth/users/users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    // Aqui você pode ter uma lista de usuários simulados
    { id: 1, username: 'usuario1', password: 'senha1' },
    { id: 2, username: 'usuario2', password: 'senha2' },
    // ...
  ];

  async findByUsername(username: string): Promise<any> {
    const user = this.users.find((user) => user.username === username);
    return user || null;
  }
}
