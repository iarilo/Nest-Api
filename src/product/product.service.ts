import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './product.model/product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find_product.dto';
import { ReviewModel } from 'src/review/review.model/review.model';


@Injectable()
export class ProductService {
constructor(
@InjectModel(ProductModel.name) private  productModel: Model<ProductDocument>
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

async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
};

async updateByid(id: string, dto:CreateProductDto ){
 return this.productModel.findByIdAndUpdate(id,dto,{new:true}).exec();   
};



async findWithReviews(dto: FindProductDto){
  console.log("server - product")
return this.productModel.aggregate([
 
   { $match:{ categories: dto.category} },
   { $sort:{ _id:1 } },
   { $limit: dto.limit },
    {
     $lookup:{
        from: 'Review',
        localField:'_id',
        foreignField: 'productId',
        as:'review'
     }   
    },
    {
     $addFields: {
        reviewCount: {$size: '$review'},
        reviewAvg: {$avg: '$review. rating'}
     }   
    }
  ]).exec() as Promise<(ProductModel &
    {review: ReviewModel[],reviewCount: number, reviewAvg: number })[]>;
 };
}

















/*
@Injectable()
export class ProductService {
constructor(
@InjectModel(ProductModel.name) private  productModel: Model<ProductDocument>
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

async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
};

async updateByid(id: string, dto:CreateProductDto ){
 return this.productModel.findByIdAndUpdate(id,dto,{new:true}).exec();   
};



//Агригация нужна для подтягивание данных из одной таблицы в другую
async findWithReviews(dto: FindProductDto){
  console.log("server - product")
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
        from: 'Review',
      //Локальное поле для поиска
        localField:'_id',
      //Поле в котором надо искать
        foreignField: 'productId',
      // Поле, вывод результата  
        as:'review'
     }   
    },
    // расчёт средней оценки
    {
     $addFields: {
       //  Размер массива  (Устанавливает число отзовов)
        reviewCount: {$size: '$review'},
        //Подсчёт среднего review
        reviewAvg: {$avg: '$review. rating'}
     }   
    }
  //дополняю и типизирую  Модель
  ]).exec() as Promise<(ProductModel &
    {review: ReviewModel[],reviewCount: number, reviewAvg: number })[]>;

 };

}
*/



