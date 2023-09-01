import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewModel } from '../review/review.model/review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
// import { ProductModel } from 'src/product/product.model/product.model';
import { ProductModel } from '../product/product.model/product.model';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ReviewService {
  constructor(
    //Доступ к модели из ReviewModel
    @InjectModel(ReviewModel.name )
    private readonly reviewModel: Model<ReviewModel>,
    @InjectModel(ProductModel.name )
    private readonly productModel: Model<ProductModel>
  
  ) {}

  //Вся база данных
  async rewiewAll(): Promise<ReviewModel[]> {
    const review = await this.reviewModel.find().exec();
    return review;
  }

  async findById (dto: CreateReviewDto){
    return await this.reviewModel.findById(dto.productId).populate('product');
  }

  // --------------------------------------------
//Создание новой записи в базе данных
  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    const productItem = await this.productModel.findById(dto.productId);
    const reviewItem = await this.reviewModel.create(dto);
    reviewItem.productId = productItem._id;
    await reviewItem.save();
    return reviewItem;
}
    // ----------------------------------------------
 
  // Обновление данных
  async updateReview(id: string, review: ReviewModel): Promise<ReviewModel> {
    return await this.reviewModel
      .findByIdAndUpdate(id, review, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  // Удание новой записи из базы данных
  async delete(id: string): Promise<ReviewModel | null> {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }
  //.........................................
  //Поиск по id  продукта
 
  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return await this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  //...........................................

  // Удание всех отзовов этого товара
  async deleteBayProductId(productId: string) {
    return await this.reviewModel
      .deleteMany({
        productId: new Types.ObjectId(productId).toHexString(),
      })
      .exec();
  }
}

// @Injectable()
// export class ReviewService {}
