import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductModel,
  ProductSchemaFactory,
} from './product.model/product.model';



@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name,schema: ProductSchemaFactory }
    ]),
  ],
})
export class ProductModule {}
