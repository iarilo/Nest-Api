import { ITelegramOptions } from "src/telegram/telegram.interface";
import { ConfigService } from "@nestjs/config";


export const getTelegramConfig = 
   (configService: ConfigService):ITelegramOptions => {
  const token =  configService.get('TELEGRAM_TOKEN');
  if (!token){
   throw new Error("нет токена" )
  };

  return{
   token: token,
   chatId: configService.get('CHAT_ID') ?? ''
  };
};




/*
export const getTelegramConfig = 
   (configService:ConfigService):ITelegramOptions  => {
 // Полючаю токен бота из env.  
const token = configService.get('TELEGRAM_TOKEN');
      console.log('token-configService: ', token ) // Загрузка 1
if(!token){
   throw new Error('TELEGRAM_TOKEN не задан')
}   
   return{
    token: token,
    // Получаю id Телеграма из env.
    chatId: configService.get('CHAT_ID') ?? ''
 };  
}; 

*/