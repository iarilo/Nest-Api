import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchemaFactory } from './review.model/review.model';
import { ProductModel, ProductSchemaFactory } from '../product/product.model/product.model';


@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewSchemaFactory },
      { name: ProductModel.name, schema: ProductSchemaFactory },
    ]),
  ],
})
export class ReviewModule {}

//  MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchemaFactory },]),
