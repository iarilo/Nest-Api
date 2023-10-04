import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';




@Injectable()
export class TelegramService {
bot:  Telegraf;
options: ITelegramOptions;

constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options:ITelegramOptions) {
   
this.bot = new Telegraf(options.token),
this.options = options

};


async sendMessage(message: string, chatID: string = this.options.chatId){
await this.bot.telegram.sendMessage(chatID,message)
 };



};



/*
@Injectable()
export class TelegramService {
bot: Telegraf;// Вход в Телеграм
options: ITelegramOptions; // chatId: string; token: бота;  
//chatId: 1101764319;
// token: 6431536024:AAEfq6piTA3kBaeFrkmdPl4jGjDHOc2OKrY;


// Конфигурация бота
//Из метода createAsyncOptionsProvider  модуля  TelegramModule     
//по токину TELEGRAM_MODULE_OPTIONS  получаю опции из крнфиг сервиса

constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions){
console.log('TELEGRAM_MODULE-Server: ',TELEGRAM_MODULE_OPTIONS) // Загрузка 3
console.log('Options-Server: ',options )
this.bot = new Telegraf(options.token);
this.options = options;
};

// Передаю Боту сообщение и id Телеграма  
async sendMessage(message: string, chatId: string = this.options.chatId){
 // chatId обязательно должен быть первым   
 await this.bot.telegram.sendMessage(chatId,message);
 };

};

*/