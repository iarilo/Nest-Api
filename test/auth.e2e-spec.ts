import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {  disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';


const loginDto: AuthDto = {
    login: 'a@a.ru',
    password:'1'
    }
  //================================================
   
    describe('AuthController (e2e)', () => {
      let app: INestApplication; 
       beforeEach(async () => {
       const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication(); 
        await app.init();
       
      });
      // ================================================
      // Метод create
      it('/auth/login (Post)', async () => {
        return (
          request(app.getHttpServer())
            // Запросы
            .post('/auth/login')
            // Передаю данные
            .send(loginDto)
            // Что получаем
            .expect(200)
            .then(({ body }: request.Response) => {
            expect(body.access_tocen).toBeDefined();
            })
        );
      });
    
      //===================================================
    
      it('/auth/login (Post) - fail password',  () => {
        return (
          request(app.getHttpServer())
            // Запросы
            .post('/auth/login')
            // Передаю данные
            .send({...loginDto, password:'2'})
            // Что получаем
            .expect(401,{
                statusCode: 401,
                message: "НЕ ПРАВИЛЬНО УКАЗАН ПАРОЛЬ ",
                error: "Unprocessable Entity"
            })
         );
      });

          //===================================================
   
          it('/auth/login (Post) - fail login',  () => {
            return (
              request(app.getHttpServer())
                // Запросы
                .post('/auth/login')
                // Передаю данные
                .send({...loginDto, login: 'b@b.ru',})
                // Что получаем
                .expect(401, {
                    statusCode: 401,
                    message: "пользователь с таким email не найден ",
                    error: "Unauthorized"
                })               
            );
          });
   
      
        
         //====================================================

      // Отключаю базу данных:  afterAll выполняется после всех тестов
  
      afterAll(() => {
        disconnect();
      });
    });

    // npm run test:e2e

























/*
const loginDto: AuthDto = {
login: 'a@a.ru',
password:'1'
}
//================================================
// описание группы тестов
describe('AuthController (e2e)', () => {
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
   
  });
  // ================================================
  // Описание  тестов //
  // Метод create
  it('/auth/login (Post)', async () => {
    return (
      request(app.getHttpServer())
        // Запросы
        .post('/auth/login')
        // Передаю данные
        .send(loginDto)
        // Что получаем
        .expect(200)

        // разбираю ответ и получаю id из mongo//
        //  1)Получаю body из Response
        .then(({ body }: request.Response) => {
         // 3) Проверка на undefain: функ. expect делает проверку,
          // toBeDefined() проверяет что он есть.
          expect(body.access_tocen).toBeDefined();
        })
    );
  });

  //===================================================
  // Функция ПОИСКА
  it('/review/byProduct/:productId (GET)', async () => {
    //2) Из  request получаю app.getHttpServer(), методом отправки путь и id из body
    // методом expect код.
    return request(app.getHttpServer())
      .get('/review/byProduct/' )
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
  

//
  // Отключаю базу данных:  afterAll выполняется после всех тестов
  //  disconnect функ.  из 'mongoose'
  afterAll(() => {
    disconnect();
  });
});

*/