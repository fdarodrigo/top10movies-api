import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async findMostLikedMovies(): Promise<any[]> {
    return this.movieLikeModel
      .aggregate([
        {
          $group: {
            _id: '$movieId',
            likes: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'movies', // Use o nome da coleção de filmes
            localField: '_id',
            foreignField: '_id',
            as: 'movie',
          },
        },
        {
          $unwind: '$movie',
        },
        {
          $project: {
            _id: 0,
            movieId: '$movie._id',
            title: '$movie.title',
            likes: 1,
          },
        },
        {
          $sort: {
            likes: -1,
          },
        },
      ])
      .exec();
  }

  async getMostLikedMovies(): Promise<any> {
    try {
      const mostLikedMovies = await this.movieLikeModel
        .aggregate([
          {
            $group: {
              _id: '$movieId',
              likes: { $sum: 1 },
            },
          },
          { $sort: { likes: -1 } },
          { $limit: 10 },
          {
            $lookup: {
              from: 'movielikes',
              localField: '_id',
              foreignField: 'movieId',
              as: 'movie',
            },
          },
          { $unwind: '$movie' },
          { $project: { _id: 0, movie: 1, likes: 1 } },
        ])
        .exec();

      return mostLikedMovies;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching most liked movies',
      );
    }
  }
}
