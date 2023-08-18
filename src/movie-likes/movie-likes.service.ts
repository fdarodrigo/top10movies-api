import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieLike } from './movie-like.model';

@Injectable()
export class MovieLikesService {
  constructor(
    @InjectModel(MovieLike.name) private movieLikeModel: Model<MovieLike>,
  ) {}

  async create(data: Partial<MovieLike>): Promise<MovieLike> {
    const like = new this.movieLikeModel(data);
    return like.save();
  }
}
