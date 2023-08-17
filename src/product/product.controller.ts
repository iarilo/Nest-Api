import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { CreateProductDto  } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './constants/constants_product.dto';
import { FindProductDto } from './dto/find_product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // метод    создания
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
   //все продукты
   @Get('all')
   async allProduct(dto: CreateProductDto ){
    return this.productService.allProduct(dto);
   };


  // метод  получения
  @Get(':id')
  async get(@Param('id') id: string) {
    const product =  await this.productService.findById(id);
    if(!product){
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    };
    return product;
  };
  // метод  удаления
  @Delete(':id')
  async delete(@Param('id') id: string) {
   const deleteProduct = await this.productService.deleteById(id);
   if(!deleteProduct){
    throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
   };
  };

  // метод    обновления
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    const updateProduct = await this.productService.updateByid(id,dto);
    if(!updateProduct){
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    };
    return updateProduct;
  };

  // метод   поиск
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto ) {
    console.log('controller-find')
    return this.productService.findWithReviews(dto)
  }
}
