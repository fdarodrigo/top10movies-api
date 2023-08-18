// movie-like.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieLike, MovieLikeSchema } from './movie-like.model';
import { MovieLikesService } from './movie-likes.service';
import { MovieLikesController } from './movie-likes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovieLike.name, schema: MovieLikeSchema },
    ]),
  ],
  controllers: [MovieLikesController],
  providers: [MovieLikesService],
})
export class MovieLikesModule {}
