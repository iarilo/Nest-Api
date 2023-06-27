import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchemaFactory } from './review.model/review.model';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewSchemaFactory },
    ]),
  ],
})
export class ReviewModule {}
