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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model/review.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt_guard';
import { UserEmail } from 'src/decorators/user_email_decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //Вся база данных
  @Get()
  async allReview(): Promise<ReviewModel[]> {
    return this.reviewService.rewiewAll();
  }

  //метод    создания
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    // async create(@Body() dto: ReviewModel) {
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteDoc = await this.reviewService.delete(id);
    if (!deleteDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
  //....................................
  //метод  получения
  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string
    
    ){
    console.log('Email: ', email)
    return this.reviewService.findByProductId(productId);
  }
  //...................................

  // Удание всех отзовов этого товара
}

// @Controller('review')
// export class ReviewController {}Ё

// npm run start:dev
