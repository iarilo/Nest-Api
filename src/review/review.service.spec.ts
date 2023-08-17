
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

/*
 //  39. Unit тесты
describe('ReviewService', () => {
  let service: ReviewService;
  const exec = {exec: jest.fn()};
  const reviewRepositoryFactory = () => ({
  find: () => exec
})
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      ReviewService,
      
      {useFactory: reviewRepositoryFactory, provide: getModelToken('ReviewModel')} 
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId working', async () => {
     const id = new Types.ObjectId().toHexString();
       reviewRepositoryFactory().find().exec.mockReturnValueOnce([{productId: id}]);
        const res = await  service.findByProductId(id);
       expect(res[0].productId).toBe(id);
  });
});

*/



















// 39. Unit тесты
/*
describe('ReviewService', () => {
  let service: ReviewService;

 //Описание функции exec
 // Функция jest.fn() позволяе слушать, устанавливать, эмитировать  функцию
  const exec = {exec: jest.fn()};
  // Что  описывает  функция  фабрика " reviewRepositoryFactory "
  // Функция   reviewRepositoryFactory  возврощает обыект с мотодом 
  // "find" и возврощает  метод "exec" аналогисно тому как это в сервисе
  const reviewRepositoryFactory = () => ({
  find: () => exec
})
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      ReviewService,
       // 1) Устанавливаю необходимые зависимости
       // Устанавливаю модуль  "Модели"
       // Токен указанной модели :  getModelToken('ReviewModel')
       // provide ищет токен и инжектид   фабрику  "reviewRepositoryFactory"
      {useFactory: reviewRepositoryFactory, provide: getModelToken('ReviewModel')} 
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  // СБОРКА СЕРВИСА
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
// Описание теста
  it('findByProductId working', async () => {
    // Создаю новый id для вызова сервиса
    const id = new Types.ObjectId().toHexString();
    // Вызываю репозиторий и передаю productId из модели
    // Функция mockReturnValueOnce устанавливает необходимые данные
    reviewRepositoryFactory().find().exec.mockReturnValueOnce([{productId: id}]);
    //
    const res = await  service.findByProductId(id);
    // Проверяю что  нулевой элемент из findByProductId = id 
    expect(res[0].productId).toBe(id);
  });
});
*/

// npm run test