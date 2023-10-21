import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  // Подключает приложение cookie
  app.enableCors({
    // Источник cookies и порт интерфейса
    origin: 'http://localhost:8080',
    // учётные данные для  работы cookies интерфейса {httpOnly: true}
    credentials:true
  })
  await app.listen(3000);
}
bootstrap();
