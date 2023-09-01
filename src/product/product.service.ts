import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './product.model/product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find_product.dto';
import { ReviewModel } from '../review/review.model/review.model';


@Injectable()
export class ProductService {
constructor(
@InjectModel(ProductModel.name) private  productModel: Model<ProductDocument>,
//@InjectModel(ReviewModel.name )private readonly reviewModel: Model<ReviewModel>,
 ){};

async create(dto: CreateProductDto ){
    return this.productModel.create(dto);
};

async allProduct(dto: CreateProductDto):Promise<ProductModel[]>{
  return this.productModel.find(dto).exec();
}

async findById(id: string) {
    return this.productModel.findById(id).exec();
};

//Из productModel подучаю продукт и подключаю к нему модель ReviewModel
// reviews - это подключение модели ProductModel к модели ReviewModel    
async findByIdWithReview(id: string){
return (await this.productModel.findById(id)).populated('reviews') 
}

async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
};

async updateByid(id: string, dto:CreateProductDto ){
 return this.productModel.findByIdAndUpdate(id,dto,{new:true}).exec();   
};

//Агригация нужна для подтягивание данных из одной таблицы в другую
async findWithReviews(dto: FindProductDto){
return this.productModel.aggregate([
  // Aggregation Pipelines  Наборы последовательных шагов,
  // которые будут использованы в базе данных
  // сортировка по категории и лимит выдачи  
  //Сравнивает  значение из mongo с нашим значением

     //Среди всех продуктов нахожу категории
   { $match:{ categories: dto.category} },
     //Сортирую категории по id
   { $sort:{ _id:1 } },
     // Указываю лимит
   { $limit: dto.limit },
   // подключаю одну коллекцию к другой (подключаю review)
    {
     $lookup:{
      // Из какой таблицы подтягиваю данные
        from: 'reviewmodels',
      //Локальное поле для поиска
        localField:'_id',
      //Поле в котором надо искать
        foreignField: 'productId',
      // Поле, вывод результата  
        as:'asReview'
     }   
    },
    // расчёт средней оценки
    {
     $addFields: {
       //  Размер массива  (Устанавливает число отзовов)
        reviewCount: {$size: '$asReview'},
        //Подсчёт среднего review
        reviewAvg: {$avg: '$asReview.rating'},
    // Функции    
    fanReview: {
      $function:{
        //1-ый входящий параметр  (тело функции)
        body: ` function (asReview) {
          asReview.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
          return asReview; 
        } `,
       //2-ый входящий параметр (аргументы)
        args:['$asReview'],   
        //3-ый входящий параметр (язык)
        lang: 'js'

       }
      }
     }   
    }
  //дополняю и типизирую  Модель
  ]).exec() as Promise<(ProductModel &
    {review: ReviewModel[],reviewCount: number, reviewAvg: number })[]>;

 };

}




