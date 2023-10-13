import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TopPageModel,
  TopPageSchemaFactory,
} from './top-page.model/top-page.model';
import { HhModule } from 'src/hh/hh.module';

@Module({
  controllers: [TopPageController],
  providers: [TopPageService],

  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageSchemaFactory },
    ]),
    HhModule,
  ],
  exports: [TopPageService],
})
export class TopPageModule {}
