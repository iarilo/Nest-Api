import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './config/telegram.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI, { dbName: 'Top-api' }),
    // UsersModule,
     AuthModule,
     TopPageModule,
     ProductModule,
    ReviewModule,
    FilesModule,
    SitemapModule,
    TelegramModule.forRootAsync(
         {
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:getTelegramConfig
          }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



























// .forRootAsync(
//   // Построение конфигурации
//   {
//     imports:[ConfigModule],
//     inject:[ConfigService],
//     useFactory:getTelegramConfig
// //useFactory  принимает из getTelegramConfig token и chatID         
//   }
// )