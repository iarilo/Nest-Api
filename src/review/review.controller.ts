import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  // метод    создания
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}
  // метод  удаления
  @Delete(':id')
  async delete(@Param('id') id: string) {}
  // метод  получения
  @Get('byProduct/productId')
  async get(@Param('productId') product: string) {}
}
