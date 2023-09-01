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
} from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';
import { TopPageService } from './top-page.service';
import { DocumentTopPageDto } from './dto/document-top-page.dto';
import { IdValidationPipes } from 'src/pipes/ad-validation.pipe';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt_guard';


@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly configService: ConfigService,
    private readonly topPageService: TopPageService,
  ) {}
  // метод    создания
  //@UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: DocumentTopPageDto) {
   return this.topPageService.createPage(dto)
  };

  // метод   получения
  @Get('all')
  async getPage(dto: DocumentTopPageDto) {
   return this.topPageService.allPage(dto)
}
  @Get(':id')
  async get(@Param('id',IdValidationPipes) id: string) {
    const config = this.configService.get('PASS');
    console.log('config', config);
    return config
  }

  //@UseGuards(JwtAuthGuard)
  @Get('page/:id')
  async findById(@Param('id',IdValidationPipes) id: string ){
   const page = await this.topPageService.findById(id)
   if(!page){
    throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    };
    return page
  };
  
  @Get('byAlias/:alias')
  async findByAlias(@Param('alias') alias: string){
  const aliasPage = await this.topPageService.findByAlias(alias);
  if(!aliasPage){
    throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    };
    return aliasPage;
  }

  @Get('textSeatch/:text')
  async findByText(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
  //метод  удаления
  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id',IdValidationPipes) id: string) {
    const deletePage = await this.topPageService.deletePage(id)
    if(!deletePage){
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
      };
  };

  // метод  обновления
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id',IdValidationPipes) id:string,
    @Body()  dto: DocumentTopPageDto) {
    const updatePage = await this.topPageService.updatePage(id,dto);
    if(!updatePage){
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
      };
      return updatePage
  };
  //метод поиска
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
}


