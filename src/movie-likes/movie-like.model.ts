import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MovieLike extends Document {
  @Prop({ required: true })
  movieId: number;

  @Prop({ required: true })
  userId: string;
}

export const MovieLikeSchema = SchemaFactory.createForClass(MovieLike);
