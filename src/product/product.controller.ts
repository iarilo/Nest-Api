import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // метод    создания
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {}
  // метод  получения
  @Get(':id')
  async get(@Param('id') id: string) {}
  // метод  удаления
  @Delete(':id')
  async delete(@Param('id') id: string) {}
  // метод    обновления
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {}
  // метод   поиск
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {}
}
