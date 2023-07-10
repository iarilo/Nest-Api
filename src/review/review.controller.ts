import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model/review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //Вся база данных
  @Get()
  async allReview(): Promise<ReviewModel[]> {
    return this.reviewService.rewiewAll();
  }

  //метод    создания
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  //Обновление данных
  @Put(':id')
  async reviewUpdate(
    @Param('id') id: string,
    @Body() update: ReviewModel,
  ): Promise<ReviewModel> {
    return this.reviewService.updateReview(id, update);
  }
  // метод  удаления
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteDoc = await this.reviewService.delete(id);
    if (!deleteDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
  // метод  получения
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}

// @Controller('review')
// export class ReviewController {}

// npm run start:dev
