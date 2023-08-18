import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MovieLikesService } from './movie-likes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie-likes')
export class MovieLikesController {
  constructor(private readonly movieLikesService: MovieLikesService) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() body) {
    return this.movieLikesService.create({
      movieId: body.movieId,
      userId: body.userId,
    });
  }
}
