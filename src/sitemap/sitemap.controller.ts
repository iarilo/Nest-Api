import { Controller,Get,Header } from '@nestjs/common';
import { ConfigService} from '@nestjs/config';
import { TopPageService } from 'src/top-page/top-page.service';
import {format, subDays} from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './siteMap.constans';



@Controller('sitemap')
export class SitemapController {
domain: string	
constructor(
private readonly  topPageService: TopPageService,
private readonly  configService: ConfigService  
) {
   this.domain = this.configService.get('DOMAIN' ?? '')  
}



@Get('xml')
@Header('content-type','text/xml')
async sitemap() {
		const formatString = 'yyyy-MM-dd\'T\'HH:mm:00.000xxx';
		let res = [
        {
            loc: this.domain,
            lastmod:format(subDays(new Date(),1),formatString), 
            changefreq: 'daily',
            priority: '1.0'
        },
        {
            loc:`${this.domain}/Courses`, 
            lastmod:format(subDays(new Date(),1),formatString), 
            changefreq: 'daily', 
            priority: '1.0'
        }
   ];

    const pages = await this.topPageService.findAll();
     
    res = res.concat(pages.map( page => {
        return {
            loc:`${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}}`, 
            lastmod:format(new Date(page.updatedAt ?? new Date()),formatString), 
            changefreq: 'weekly', 
            priority: '0.7'
        }
    }));

      	const builder = new Builder({
         xmldec: {version:"1.0" ,encoding: "UTF-8"}   
        });

      return  builder.buildObject({
            urlset:{
        $:{ xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"},
        url: res        
     }

   });    
	
 };

};















/*
@Controller('sitemap')
export class SitemapController {
    domain: string
    constructor(
        private readonly topPageServer: TopPageService,
        private readonly configService: ConfigService 
        ){
    this.domain = this.configService.get('DOMAIN') ?? ''; 
    };

 @Get('xml')
 @Header('content-type','text/xml')   
 async sitemap(){

//  Формат даты        2021-04-01T18:20:00.000+03:00	
 const formatString = 'yyyy-MM-dd\'T\'HH:mm:00.000xxx';

//      ...............................................
// res Отправляет приложение
let res = [
 // Описание главной страницы, корневой url   
    {
    loc: this.domain,  //домен
	//subDays вычисляет число дней отнимая один.
    lastmod:format(subDays(new Date(),1), formatString),//когда модефицирован
    changefreq:'daily',// как часто модефицируется
    priority:'1.0'// какой приоритет
    },
// Страница с категориями    
    {
    
        loc: `${this.domain}/Courses`,
        lastmod:format(subDays(new Date(),1), formatString),
        changefreq:'daily',
        priority:'1.0'

    }]
//     ....................................................      

                        // Динамически подтягиваю все страницы
// Получаю все страницы из базы данных	 					
const pages = await this.topPageServer.findAll();
// Метод concat используется 
//    для объединения двух или более массивов в 1. 
res = res.concat(pages.map(page => {
//CATEGORY_URL[page.firstCategory] enum Courses,Service,Boocs,Products
// page.alias название страницы, alias модели.  
	
return{
loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
// page.updatedAt дата создания странмцы из модели		
lastmod:format(new Date( page.updatedAt ?? new Date()), formatString),
changefreq:'weekly',
priority:'0.7'
    }
}))

//    ....................................................

  // Описываю xml файл:  version="1.0" encoding="UTF-8"
  // Builder Строит результирующий XML
const builder = new Builder({
xmldec: {version:"1.0" ,encoding:"UTF-8"},
});

//      ...................................................

return builder.buildObject({
// Создаю объект  urlset: который состоит из xmlns
// и массива со свеми URL страницами

// Возврощаю    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
//И массив со свеми URL. url Корневая страница,url  Список курсов,
//url Все страницы из базы данных 
 urlset: {
//$: описывает содержимое внутриности 	
 $: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
 url: res
     }
   })
 };

};
*/