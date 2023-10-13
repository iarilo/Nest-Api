import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TopPageModel,
  TopPageDocument,
  TopLevelCategory,
} from './top-page.model/top-page.model';
import { DocumentTopPageDto } from './dto/document-top-page.dto';
import { addDays } from 'date-fns';
import { Types } from 'mongoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private topPageModel: Model<TopPageDocument>,
  ) {}

  async createPage(dto: DocumentTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async allPage(dto: DocumentTopPageDto): Promise<TopPageModel[]> {
    return this.topPageModel.find(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findAll() {
    return this.topPageModel.find();
  }

  // ----------------------------------------------
  // Поиск по категориям с вложеностью и групировкой
  // firstCategory Курсы, Сервисы, книги, товары
  // secondCategory Веб-дизайн, Разработка, Аналитика,
  // pages  Photoshop, After effect
  async findByCategory(firstCategory: TopLevelCategory) {
    return (
      this.topPageModel
        .aggregate()
        // Перебираю категории
        .match({ firstCategory: firstCategory })
        // Групирую по критэрию secondCategory
        .group({
          _id: { secondCategory: '$secondCategory' },
          // Наборы страниц из secondCategory
          // Оператор $push добавляет в массив объект
          pages: { $push: { alias: '$alias', title: '$title' } },
        })
        .exec()
    );

    // Фильтрация по категории,когда выдаются только необходимые поля
    // return this.topPageModel.
    //  find({firstCategory},{alias:1,secondCategory:1,title:1},)
  }

  //----------------------------------------------------

  // Поиск по тексту в 1 поле
  async findByText(text: string) {
    return this.topPageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  /*
    async findByText(text: string) {
        const index =  this.topPageModel.createIndexes(
            {fieldsAsRaw:{title:text, seoText:text }}
      )
      if(!index){
        console.log("Error")
      } 
      const search = this.topPageModel.find({index});
      return search;  
 }
 */

  /*   
async findByText(text: string) {
       return this.topPageModel.find(
     {createIndex:{ title:"text", seoText:"text" }}
  ).exec(); 
 }
*/

  // ------------------------------------------------------
  //Можно обновлять как по строке так и по ObjectId
  async updatePage(id: string | Types.ObjectId, dto: DocumentTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deletePage(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  // Сторонее API  курса валюты
  async findForHhUpdate(date: Date) {
    // Получаю все hh из модели top-page-model старши предыдущих.
    return this.topPageModel
      .find({
        // Выбираю именно курсы  из модели top-page-model
        firstCategory: 0,
        //  $or   передаёт массив условий
        $or: [
          //  Ищю по предыдущему  updatedAt
          //  $lt из mongo означает меньше
          //  $lte из mongo означает меньше или равно
          //  $gt из mongo означает больше
          //  $gte из mongo означает меньше или равно
          //  addDays из 'date-fns' вычисляет дату ;

          // Первое условие
          { 'hh.updatedAt': { $lt: addDays(date, -1) } },
          // $exists вообще не существует
          // Второе условие
          { 'hh.updatedAt': { $exists: false } },
        ],
      })
      .exec();
  }
}
