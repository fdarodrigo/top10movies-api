import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando o CORS para permitir requisições do seu aplicativo Angular
  app.use(
    cors({
      origin: 'http://localhost:4200',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Isso permite o envio de cookies e cabeçalhos de autenticação
    }),
  );

  await app.listen(3000);
}
bootstrap();
