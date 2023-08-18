import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieLikesModule } from './movie-likes/movie-like.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/movie-likes',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    JwtModule.register({
      secret: 'chave-secreta-aqui',
      signOptions: { expiresIn: '1h' },
    }),
    MovieLikesModule,
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
