import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { API_URL } from './hh.constans';
import { firstValueFrom } from 'rxjs';
import { HhResponse } from './hh.models';
import { HhData } from 'src/top-page/top-page.model/top-page.model';

@Injectable()
export class HhService {
  private token: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get('TOKEN_Hh') ?? '';
  }

  public async getData(textUrl: string) {
    try {
      // Аналог Promise FirstValueFrom  Преобразует наблюдаемое в обещание, и возвращаят обещание,которое будет выполнено, как только и поступит первое значение  и оно будет закрыта.

      //   const response = await firstValueFrom(
      const response = await firstValueFrom(
        // Получаю данные из API

        //API_URL  это https строка. Путь к API
        this.httpService.get(API_URL.valute, {
          // Устанавливаю дополнительные параметры
          // Query параметр. Всё что после ? знака https://www.cbr-xml-daily.ru/daily_json.js?text=EUR&Valute=true
          params: { text: textUrl, Valute: true },
          // Headers параметр
          headers: {
            //В место insomnia/2023.5.8 должено быть название сайта
            'User-Agent': 'insomnia/2023.5.8(vitalii@gmail.com)',
            // Токен из авторизации
            Authorization: 'Bearer ' + this.token,
          },
        }),
      );

      return this.parseData(response.data);
    } catch (err) {
      Logger.error(err);
    }
  }

  //Преобразую полученные данные к модели
  //HhResponse  Интерфейс с данными из API Date,PreviousDate,PreviousURL,Timestamp,Valute
  // HhData Класс из top-page.model  count,juniorSalary,middleSalary,seniorSalary,updatedAt: Date;

  private parseData(data: HhResponse): HhData {
    // Данные из объекта EUR
    const valute = data.Valute.EUR;

    if (!valute) {
      throw new Error('Данные API с не поступили');
    }
    //Присвиваю параметрам из top-page.model данные из API
    return {
      count: data.Valute.EUR.Name,
      juniorSalary: data.Valute.MDL.Value,
      middleSalary: data.Valute.USD.Value,
      seniorSalary: data.Valute.EUR.Value,
      updatedAt: new Date(),
    };
  }
}
