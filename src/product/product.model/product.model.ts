import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema()
export class ProductModel {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  oldPrice: number;

  @Prop({ required: true })
  credit: number;

  @Prop({ required: true })
  calculatedRating: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  advantages: string;

  @Prop({ required: true })
  disAdvantages: string;

  @Prop([String])
  categories: [string];

  @Prop({ required: true })
  tags: string;

  @Prop([String])
  characteristics: {
    [key: string]: string;
  };
}

export const ProductSchemaFactory = SchemaFactory.createForClass(ProductModel);
