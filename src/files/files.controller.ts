import { 
    Controller,
     Delete,
     HttpCode, Post,
      UploadedFile, 
       UseGuards,
        UseInterceptors,
        Req,
        Get,
        Res,
        Next,
        NotFoundException,
 } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt_guard';
import { FilesService } from './files.service';
import { FileElementResponse } from './file-element-response.Dto';
import { MFile } from './mfile.class';
import {Request, Response, NextFunction } from 'express';
import { FileNameDto } from './Dto/files.name-dto';



@Controller('files')
export class FilesController {
constructor(private readonly filesService: FilesService){}

@Post('upload')
@HttpCode(200)
@UseInterceptors(FileInterceptor('files'))
async uploadFile(@UploadedFile() files:Express.Multer.File){

const arrFiles: MFile[] = [new MFile(files)];

if(files.mimetype.includes('image')){
   await this.filesService.convertTowebP(files.buffer);
   arrFiles.push(new MFile({
    originalname:`${files.originalname.split('.')[0]}.webp`, 
    buffer: files.buffer
  }))
}else{
throw new NotFoundException('Файл не указан')
};

return this.filesService.seveFiles(arrFiles)
};

 // Удаление папки
 @Delete('deleteFolder')
 async dellFolder(@Req() req: Request) {
 return this.filesService.deleteFolder(req.body.folder)
 };

 // Удаление файла
 @Delete('deleteFile')
 async dellFile( @Req() req: Request){
  return this.filesService.deleteFile(req.body.file)
 };

// Показать все папки и файлы
@Get('allFolderFile')
async allFolderFile(
  @Req() req: Request,
  @Res() res: Response,
  @Next() next: NextFunction,
 ){
 return this.filesService.allFolderFile(
  res, next, req.body.folder, req.body.file
  );
};





};
  


































/*
@Controller('files')
export class FilesController {
constructor(private readonly filesService: FilesService ){};

@Post('upload')
@HttpCode(200)
// UseInterceptors фун. FileInterceptor    преобразуют запрос в файл  
//Use Interceptors  Используйте перехватчики
// FileIntercept  Перехват файла
@UseInterceptors(FileInterceptor('files'))


// Метод передаёт как исходную картинку так и сконвертируемый
//UploadedFile   Загруженный файл
async uploadFile(
 @UploadedFile() file: Express.Multer.File):
 Promise<FileElementResponse[]>{


// Через инстонс конструктора конвертирую исходный файл  
// new MFile(file)  данные исходной  картинки
const saveArray: MFile[] = [new MFile(file)] 

 // Проверяю есть ли у файла значение image  
 //  file.mimetype. строка содержит тип
 // includes() включает в себя
if(file.mimetype.includes('image')){

  // Конвертирую файл и сохраняю в buffer
  
const buffer = await this.filesService.convertTowebP(file.buffer);

// Добавляю к исходной картинки объект с новым форматом картинки
saveArray.push(new MFile({
  // загрузка конвертируемой картинки  webp 
  //Методом split разбираю  по точке lamb.jpg на lamb и jpg
  // Получаю только lamb и добавляю .webp
originalname: `${file.originalname.split('.')[0]}.webp`,
buffer: file.buffer  
}))
};

return this.filesService.seveFiles(saveArray);


    //return this.filesService.seveFiles([file])
 }


// Удаляю 1 файл
@Delete('deleteFile')
async dellFiles (@Req() req: Request<{},{},FileNameDto> ) {
  const reqName = req.body.name
   return this.filesService.dellFiles(reqName)
}

// Удаляю папку
@Delete('removeFolder') 
async removeFoolder(@Req() req: Request) {
const folder = req.body.folder
return this.filesService.removeFoolder(folder)
};

//Все паки и файлы
@Get('allFiles')
async allFiles(
  @Res() res: Response, @Req() req: Request, @Next() next: NextFunction){
  this.filesService.allFiles(res, req.body.file, req.body.folder,next)
 };


}
*/


//@UploadedFiles() получает из запроса  массив файлов