import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewModel>;
export const productId = new Types.ObjectId().toHexString();
@Schema({ timestamps: true })
export class ReviewModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: number;

  // @Prop({ type: Types.ObjectId, default: undefined })
  // productId: Types.ObjectId;
  // @Prop({ type: MSchema.Types.ObjectId })
  // @Prop()
  // productId: Types.ObjectId;
  @Prop()
  productId: Types.ObjectId;
}

export const ReviewSchemaFactory = SchemaFactory.createForClass(ReviewModel);
