import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Service,
  Boocs,
  Products,
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

@Schema()
export class TopPageModel {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  firstCategory: TopLevelCategory;

  @Prop({ required: true })
  secondCategory: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };

  @Prop(String)
  advantages: {
    title: string;
    description: string;
  }[];

  @Prop({ required: true })
  seoText: string;

  @Prop({ required: true })
  tagsTitle: string;

  @Prop([String])
  tags: [string];
}

export const TopPageSchemaFactory = SchemaFactory.createForClass(TopPageModel);
