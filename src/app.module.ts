import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
/* import { MovieLikesController } from './movie-likes/movie-likes.controller'; */
/* import { AuthService } from './auth/auth.service'; */
/* import { MovieLike } from './movie-likes/movie-like.model'; */
import { MovieLikesModule } from './movie-likes/movie-like.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/movie-likes',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    JwtModule.register({
      secret: 'chave-secreta-aqui', // Substitua pela sua chave secreta
      signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
    }),
    MovieLikesModule,
  ],
  controllers: [AppController],
  providers: [AppService /* AuthService */ /* MovieLike */],
})
export class AppModule {}
