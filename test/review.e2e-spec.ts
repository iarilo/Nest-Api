/*import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

// id продукта
//const productid = new Types.ObjectId().toHexString();
const productId = new Types.ObjectId().toHexString();
console.log('Productid-верх: ', productId);

// Объект который надо передать
const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание тестовое',
  rating: 5,
  productId: productId,
};

//================================================
// описание группы тестов
describe('AppController (e2e)', () => {
  let app: INestApplication; // объявляю  приложение  app
  let createId: string; // Сохраняю id из mongo
  //let productIdBody: string;
  // ==============================================
  // beforeEach выполняется перед каждым запуском теста
  // beforeAll выполняется перед всем
  // afterEach выполняется после запуска теста
  // afterAll выполняется после всех тестов

  beforeEach(async () => {
    // Создаётся тестовый модуль для запуска всего приложения
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication(); // Собирается приложение
    await app.init();
  });
  // ================================================
  // Описание  тестов //
  // Метод create
  it('/review/create (Post)', async () => {
    return (
      request(app.getHttpServer())
        // Запросы
        .post('/review/create')
        // Передаю данные
        .send(testDto)
        // Что получаем
        .expect(201)

        // разбираю ответ и получаю id из mongo//
        //  1)Получаю body из Response
        .then(({ body }: request.Response) => {
          // 2)Получаю id из body
          createId = body._id;
          //productIdBody = body.productId;
          // console.log('Body : ', body);
          //console.log('createId : ', createId);

          // 3) Проверка на undefain: функ. expect делает проверку,
          // toBeDefined() проверяет что он есть.
          expect(createId).toBeDefined();
        })
    );
  });

  //===================================================
  // Функция ПОИСКА
  it('/review/byProduct/:productId (GET)', async () => {
    //2) Из  request получаю app.getHttpServer(), методом отправки путь и id из body
    // методом expect код.
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        //expect(body.length);
        console.log('Body-byProduct: ', body);
      });
  });

  //===================================================
  // Функция УДАЛЕНИЯ
  //1) Передаю методу 2 аргум. Путь с методом отправки и колбзк
  
  it('/review/:id (DELETE)', () => {
    //2) Из  request получаю app.getHttpServer(), методом отправки путь и id из body
    // методом expect код.
    return request(app.getHttpServer())
      .delete('/review/' + createId)
      .expect(200);
  });
  

  // Отключаю базу данных:  afterAll выполняется после всех тестов
  //  disconnect функ.  из 'mongoose'
  afterAll(() => {
    disconnect();
  });
});
*/


import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';


const productId = new Types.ObjectId().toHexString();
console.log('Productid-верх: ', productId);

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание тестовое',
  rating: 5,
  productId: productId,
};

//================================================

describe('AppController (e2e)', () => {
  let app: INestApplication; 
  let createId: string; 
 
  beforeEach(async () => {
     const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication(); 
    await app.init();
  });
  // ================================================
 // Функция создания
   it('/review/create (Post)', async () => {
    return (
      request(app.getHttpServer())
     .post('/review/create')
     .send(testDto)
     .expect(201)
     .then(({ body }: request.Response) => {
      createId = body._id;
      expect(createId).toBeDefined();
        })
    );
  });

  //===================================================
  // Функция ПОИСКА
  // it('/review/byProduct/:productId (GET)', async () => {
  //     return request(app.getHttpServer())
  //     .get('/review/byProduct/' + productId)
  //     .expect(200)
  //     .then(({ body }: request.Response) => {
  //       expect(body.length).toBe(1);
  //       //expect(body.length);
  //       console.log('Body-byProduct: ', body);
  //     });
  // });

  it('/review/byProduct/:productId (Get)', async  () => {
    return request(app.getHttpServer())
   .get('/review/byProduct/' + productId )
   .expect(200)
   .then(({body}: request.Response)=> {
    expect(body.length).toBe(1)
   });
});


  //===================================================
  // Функция УДАЛЕНИЯ
   it('/review/ (DELETE)', () => {
       return request(app.getHttpServer())
      .delete('/review/' + createId)
      .expect(200);
  });
  
  afterAll(() => {
    disconnect();
  });
});
// npm run test:e2e
