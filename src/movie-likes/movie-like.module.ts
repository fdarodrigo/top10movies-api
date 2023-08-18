// movie-likes/movie-likes.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieLikesController } from './movie-likes.controller';
import { MovieLikesService } from './movie-likes.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

import { MovieLikeSchema } from './movie-like.model';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    passportModule,
    MongooseModule.forFeature([{ name: 'MovieLike', schema: MovieLikeSchema }]),
    PassportModule,
    AuthModule,
  ],
  controllers: [MovieLikesController],
  providers: [MovieLikesService],
})
export class MovieLikesModule {}
