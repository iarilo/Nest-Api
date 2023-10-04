import { ModuleMetadata } from "@nestjs/common";


export interface ITelegramOptions {
chatId: string;
token: string; 
 };


export interface ITelegramModuleAsyncOptions extends 
Pick<ModuleMetadata,'imports'>{
useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions,
inject: any[]

};





// export interface ITelegramModuleAsyncOptions extends
//  Pick<ModuleMetadata, 'imports'> {

//   useFactory: (...arg: any[]) => 

//    Promise<ITelegramOptions> | ITelegramOptions;
//   inject?: any[]
//  };




/*
// Описывае конфугурацию опций Телеграма
export interface ITelegramOptions {
  chatId: string;
  token: string;  
};

// Интерфейс для опций модуля forRootAsync
// ModuleMetadata   Интерфейсный модуль Метаданных
export interface ITelegramModuleAsyncOptions extends
 Pick<ModuleMetadata, 'imports'> {
  // useFactoryпозволяет динамически создавать поставщиков
  // useFactory получает массив аргументов, 
    //а возврощает опции chatId: string и token: string;  
  useFactory: (...arg: any[]) => 
   Promise<ITelegramOptions> | ITelegramOptions;
  inject?: any[]
 };
*/
 