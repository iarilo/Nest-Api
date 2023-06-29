import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;
  // MSchema.Types.ObjectId это  = id user
  // User.name  = названию схемы схема из модуля
  @Prop({ type: MSchema.Types.ObjectId, ref: User.name })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
