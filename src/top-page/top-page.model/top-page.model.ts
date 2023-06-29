import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Service,
  Boocs,
  Products,
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

class HhData {
  @Prop({ required: true })
  count: number;
  @Prop({ required: true })
  juniorSalary: number;
  @Prop({ required: true })
  middleSalary: number;
  @Prop({ required: true })
  seniorSalary: number;
}

class TopPageAdvantages {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
}

@Schema()
export class TopPageModel {
  @Prop({ required: true })
  _id: string;

  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop({ required: true })
  secondCategory: string;

  @Prop({ required: true, unique: true })
  alias: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop(HhData)
  hh?: HhData;

  @Prop([TopPageAdvantages])
  advantages: [TopPageAdvantages];

  @Prop({ required: true })
  seoText: string;

  @Prop({ required: true })
  tagsTitle: string;

  @Prop([String])
  tags: [string];
}

export const TopPageSchemaFactory = SchemaFactory.createForClass(TopPageModel);
