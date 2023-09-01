import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';



const productId = new Types.ObjectId().toHexString();
console.log('Productid: ', productId);

const LoginDto: AuthDto = {
login: 'a@a.ru',
password:'1'
}

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
  let app: INestApplication; 
  let createId: string;
  let token: string  
  let productIdBody: string;
  // ==============================================
 

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication(); 
    await app.init();
  // Авторизация
     const {body} = await request(app.getHttpServer())
    .post('/auth/login')
    .send(LoginDto);
    token = body.access_tocen
  });
  // ================================================

  // Метод create
  it('/review/create (Post)', async () => {
    return (
      request(app.getHttpServer())
       .post('/review/create')
       .send(testDto)
       .expect(201)
       .then(({ body }: request.Response) => {
        createId = body._id;
        productIdBody = body.productId;
        expect(createId).toBeDefined();
        })
    );
  });

  //===================================================
  // Функция ПОИСКА
  it('/review/byProduct/:productId (GET)', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  //===================================================
  // Функция УДАЛЕНИЯ
  
  
  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createId)
      .set('Authorization',' Bearer '  + token)
      .expect(200);
  });
  

  it('/review/:id (DELETE) - fail', () => {
   return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization',' Bearer '  + token)
      .expect(404, {
        statusCode:404,
        message: REVIEW_NOT_FOUND
      });
    });

  // Отключаю базу данных:  
   afterAll(() => {
    disconnect();
  });
});



// npm run test:e2e

















/*
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';


// id продукта
//const productid = new Types.ObjectId().toHexString();
const productId = new Types.ObjectId().toHexString();
console.log('Productid-верх: ', productId);

const LoginDto: AuthDto = {
login: 'a@a.ru',
password:'1'
}

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
  let token: string  // access_tocen (jwt token)
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
    // Авторизация
     //const res = await  
    const {body} = await request(app.getHttpServer())
    .post('/auth/login')
    .send(LoginDto);
    // token = res.body.access_tocen
    token = body.access_tocen
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
        //expect(body.length).toBe(1);
        expect(body.length).toBe(0);
        console.log('Body-byProduct: ', body);
      });
  });

  //===================================================
  // Функция УДАЛЕНИЯ
  //1) Передаю методу 2 аргум. Путь с методом отправки и колбзк
  
  it('/review/:id (DELETE) - success', () => {
    //2) Из  request получаю app.getHttpServer(), методом отправки путь и id из body
    // методом expect код.
    return request(app.getHttpServer())
      .delete('/review/' + createId)
      .set('Authorization',' Bearer'  + token)
      .expect(200);
  });
  

  it('/review/:id (DELETE) - fail', () => {
   return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization',' Bearer'  + token)
      .expect(404, {
        statusCode:404,
        message: REVIEW_NOT_FOUND
      });
    });

  // Отключаю базу данных:  afterAll выполняется после всех тестов
  //  disconnect функ.  из 'mongoose'
  afterAll(() => {
    disconnect();
  });
});

*/


// npm run test:e2e


























