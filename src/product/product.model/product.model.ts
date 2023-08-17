import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristic {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  value: string;
}

@Schema({ timestamps: true })
export class ProductModel {
  
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  oldPrice?: number;

  @Prop({ required: true })
  credit: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  advantages: string;

  @Prop({ required: true })
  disAdvantages: string;

  @Prop([String])
  categories: [string];

  @Prop([String])
  tags: [string];

  @Prop([ProductCharacteristic])
  characteristics: [ProductCharacteristic];
}

export const ProductSchemaFactory = SchemaFactory.createForClass(ProductModel);
