import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TopPageModel,
  TopPageSchemaFactory,
} from './top-page.model/top-page.model';

@Module({
  controllers: [TopPageController],
  providers: [TopPageService],
  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageSchemaFactory },
    ]),
  ],
})
export class TopPageModule {}
