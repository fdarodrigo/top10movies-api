import { Controller, Post, Body } from '@nestjs/common';
import { MovieLikesService } from './movie-likes.service';
/* import { JwtStrategy } from '../auth/jwt.strategy'; */
import axios from 'axios';

@Controller('movie-likes')
export class MovieLikesController {
  constructor(private readonly movieLikesService: MovieLikesService) {}

  /* @UseGuards(JwtStrategy) */
  @Post()
  async create(@Body() body) {
    console.log('Recebendo requisição para criar um like:', body);
    const newLike = await this.movieLikesService.create({
      movieId: body.movieId,
      userId: body.userId,
    });

    // Atualize o estado de likes no Angular após criar o like
    try {
      await axios.post(
        'http://localhost:4200/most-liked-movies/likes',
        newLike,
      );
    } catch (error) {
      console.error('Error updating likes in Angular:', error);
    }

    return newLike;
  }
}
