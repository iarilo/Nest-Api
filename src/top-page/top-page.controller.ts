import {
  Body,
  Controller,
  Post,
  Delete,
  Patch,
  Param,
  Get,
  HttpCode,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly configService: ConfigService,
    private readonly topPageService: TopPageService,
  ) {}
  // метод    создания
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}
  // метод   получения
  @Get(':id')
  async get(@Param('id') id: string) {
    const config = this.configService.get('PASS');
    console.log('config', config);
  }
  //метод  удаления
  @Delete(':id')
  async delete(@Param('id') id: string) {}

  // метод  обновления
  @Patch(':id')
  async patch(@Param('id') dto: TopPageModel) {}
  //метод поиска
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
