import { Type } from 'class-transformer';
import{IsString, IsNumber, IsOptional, IsArray, ValidateNested} from'class-validator'

class ProductCharacteristicDto {
  @IsString()
  name: string;
  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
   image: string;

   @IsString()
   title: string;

   @IsNumber()
   price: number;

   @IsOptional() // Не обязательное поле
   @IsNumber()
   oldPrice?: number;

   @IsNumber()
   credit: number;

   @IsString()
   description: string;

   @IsString()
   advantages: string;

   @IsString()
   disAdvantages: string;

   @IsArray()
   @IsString({each: true})//{each: true} Каждый элемент массива будит строкой
   categories: [string];

   @IsArray()
   @IsString({each: true})
   tags: [string];
   
   @IsArray()
   @ValidateNested()//Проверка в нутри вложенного Объекта
   @Type(()=> ProductCharacteristicDto)// Из библиотеки 'class-transformer'
   // Указывает тип  валидации
   characteristics: [ProductCharacteristicDto];

 
}
