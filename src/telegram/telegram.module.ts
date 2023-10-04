import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';





@Global()
@Module({})
export class TelegramModule {

   static forRootAsync(options:ITelegramModuleAsyncOptions):
  DynamicModule {
  const asyncOption = this.createAsyncOptionsProvider(options);
  return{
    module:TelegramModule,
    imports:options.imports,
    providers: [TelegramService,asyncOption],
    exports: [TelegramService]

  }; 

  };

  private static  createAsyncOptionsProvider 
  (options:ITelegramModuleAsyncOptions): Provider{
  return{
    provide: TELEGRAM_MODULE_OPTIONS,
    useFactory: async(...args: any[])=>{
      const config = await options.useFactory(...args);
      return config;
     },
     inject: options.inject || []
     };
   };
  };

  
 

  /*
@Global()
@Module({})
export class TelegramModule {
  // Создаю модуль forRootAsync
  //  DynamicModule  динамический модуль
  static forRootAsync(options:ITelegramModuleAsyncOptions):DynamicModule{
    // Вызываю Метод создания опций  и передаю ему опции
    const asyncOptions = this.createAsyncOptionsProvider(options);
    // Описание интерфейса DynamicModule
    return{
      module: TelegramModule,
      imports: options.imports,
    // Устанавливаю Метод создания опций в дерево зависимостей     
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService]
    };
  };

  // Метод создания опций 
private static
 createAsyncOptionsProvider
 (options: ITelegramModuleAsyncOptions): Provider {
return{
  // Опции 
  // args это пустой объект ConfigService, без token и chatId 
  // TELEGRAM_MODULE_OPTIONS, фраза является ключом 
  //для прочтения данных из ConfigService (на подобе Symbol )
  provide: TELEGRAM_MODULE_OPTIONS, // token
  useFactory: async (...args: any[]) => {
    console.log('useFactory-args: ', args ) // Загрузка 1
 // В options:ITelegramModuleAsyncOptions передаю функцию useFactory
 // которая должна вернуть config   
 
   // args это  объект ConfigService уже с token и chatId
   // которые пришли из getTelegramConfig,а в args они попали из
   //  AppModule так-как   useFactory:getTelegramConfig
   
  const config = await options.useFactory(...args);
  console.log('useFactory-config-args: ', args )
  return config;

  },
  inject: options.inject || []

 };
};


};

*/