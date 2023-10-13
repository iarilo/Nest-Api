import {
  Body,
  Controller,
  Post,
  Delete,
  Patch,
  Param,
  Get,
  HttpCode,
  NotFoundException,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';
import { TopPageService } from './top-page.service';
import { DocumentTopPageDto } from './dto/document-top-page.dto';
import { IdValidationPipes } from 'src/pipes/ad-validation.pipe';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt_guard';
import { HhService } from 'src/hh/hh.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly configService: ConfigService,
    private readonly topPageService: TopPageService,
    private readonly hhService: HhService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
  // метод    создания
  //@UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: DocumentTopPageDto) {
    const allPages = await this.topPageService.findAll();
    const aliasKey = allPages.map((key) => {
      return key.alias;
    });

    for (const elem of aliasKey) {
      if (dto.alias === elem) {
        throw new NotFoundException(' alias повторяется');
      }
    }

    return this.topPageService.createPage(dto);
  }

  // метод   получения
  @Get('all')
  async getPage(dto: DocumentTopPageDto) {
    return this.topPageService.allPage(dto);
  }
  @Get(':id')
  async get(@Param('id', IdValidationPipes) id: string) {
    const config = this.configService.get('PASS');
    console.log('config', config);
    return config;
  }

  //@UseGuards(JwtAuthGuard)
  @Get('page/:id')
  async findById(@Param('id', IdValidationPipes) id: string) {
    const page = await this.topPageService.findById(id);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    } else {
      return page;
    }
    //return page
  }

  @Get('byAlias/:alias')
  async findByAlias(@Param('alias') alias: string) {
    console.log('Alias: ', alias);
    const aliasPage = await this.topPageService.findByAlias(alias);
    console.log(' aliasPage: ', aliasPage);
    if (!aliasPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return aliasPage;
  }

  @Get('textSeatch/:text')
  async findByText(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
  //метод  удаления
  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipes) id: string) {
    const deletePage = await this.topPageService.deletePage(id);
    if (!deletePage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
  }

  // метод  обновления
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipes) id: string,
    @Body() dto: DocumentTopPageDto,
  ) {
    const updatePage = await this.topPageService.updatePage(id, dto);
    if (!updatePage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return updatePage;
  }
  //метод поиска
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }

  // Cron задаёт время запуска метода
  // Время запуска можно настроить детально указывая мин,часы,дни и т.д, в  место звёздочек
  //@Cron('00***')

  //@Post('test')
  // А также можно задать конкретное время с помощью CronExpression
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'test' })
  async test() {
    //Logger.log('Cron')
    // getCronJob получаетимя имя крона,которое можно использовать для других действий 
    const job = this.schedulerRegistry.getCronJob('test');
    job.start;
    //Получаю данные всех страниц по дате создания hh.updatedAt без         изменения данных
    // findForHhUpdate - поиск страниц по дате создания hh.updatedAt
    const data = await this.topPageService.findForHhUpdate(new Date());

    for (let page of data) {
      // Ищю по тексту "категории страниц" с данными из API
      const hhData = await this.hhService.getData(page.category);

      //Logger.log('hhData - ', hhData);
      // присваиваю данным из hh.TopPageModel на обновлёные данные из hhService
      page.hh = hhData;
      // обновляю данные в hh.TopPageModel
      await this.topPageService.updatePage(page._id, page);
    }
  }
}
