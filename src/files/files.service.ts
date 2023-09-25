import { Injectable, NotFoundException, Res,Next } from '@nestjs/common';
import { FileElementResponse } from './file-element-response.Dto';
import { format } from 'date-fns';
import { path, } from 'app-root-path';
import {
  ensureDir, 
  writeFile,
  unlink,
  remove,
  existsSync,
  readdirSync,
   } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';
//import { mkdir as mkdirF,rmSync}  from 'fs';
import { Response, NextFunction } from 'express';
import { HttpError } from './Errors/HttpError';

 


@Injectable()
export class FilesService {

 async seveFiles(files: MFile[]):
 Promise<FileElementResponse[]> {
 
  const dataFolder = format(new Date(), "yyyy-MM-dd");
  const uploadFolder = `${path}/uploads/${dataFolder}`;
  await  ensureDir(uploadFolder)

  const res: FileElementResponse[] = [];
  
  for(const elem of files ){
  await  writeFile(`${uploadFolder }/${elem.originalname}`, elem.buffer);
  res.push({
    url:`${dataFolder}/${elem.originalname}`,
    name: elem.originalname
   })
  };

 return res;

 };


 async convertTowebP(files: Buffer):Promise<Buffer>{
  return sharp(files).webp().toBuffer();
 
 }; 

// Путь до папки
async pathFolder(folder: string) {
  const pathFolder = `${path}/${folder}`;
  return pathFolder;
};

// Путь до файла
async pathFile (file: string){
  const pathFile = `${path}/${file}`
  return pathFile
};
 // Удаление папки
 async deleteFolder(folder: string) {
  if(existsSync(await this.pathFolder(folder))){
    remove(await this.pathFolder(folder))
  }
  throw new NotFoundException('Такая папка отсутствует')
 };


 
// Удаление файла
 async deleteFile(file: string){
  if(existsSync(await this.pathFile(file))){
    unlink(await this.pathFile(file))
  }else{
  throw new NotFoundException('Такой файл отсутствует')
  };
 };

// Показать все папки и файлы
  async allFolderFile(
   @Res() res: Response, 
   @Next()  next: NextFunction,
    folder: string, file: string 
    ){

   try {
    const allFolder = readdirSync(await this.pathFolder(folder));
    const allFiles = readdirSync(await this.pathFile(file));
    const arr = {folder: allFolder, file: allFiles}
    return res.send(arr)
   } catch (error) {
    return next(new HttpError(404, 'такой папки или файла нет') )
   }
 
  }











 
 
 };

































 // .................................................

 /*
@Injectable()
export class FilesService {

  // Метод сохранения файлов
async seveFiles(files: MFile[]):
                   Promise<FileElementResponse[]>{
  // Дата создания папки
const dateFolder = format(new Date(), 'yyyy-MM-dd');
// Создаю папку для файлов:
// path корень проекта 
// uploads название паки
// dateFolder  дата создания
const uploadFolder = `${path}/uploads/${dateFolder }`;

// Создаю путь к папке "дирикторию"
await ensureDir(uploadFolder);


const res: FileElementResponse[] = []

// Прохожусь по каждому элементу массива всех файлов files
for( const file of files ){
// Перезаписываю каждый элемент и указываю путь 
// uploadFolder  дириктория загрузки
// file.originalname  Имя файла на компьютере пользователя из Express.Multer.File
// buffer место загрузки 

// Сохроняю оригинальное название файла
//  writeFile записывает файл
 await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
// Возврощаю файл с url и name из Dto
// dateFolder
// file.originalname
// file.originalname
 res.push({url:`${dateFolder}/${file.originalname}`,name:file.originalname}
    )
   }
   return res 
  }; 



 convertTowebP(file: Buffer):Promise<Buffer> {
 return sharp(file)
 .webp()
 .toBuffer()
 };



//  Метод путь до файла
async pathFolder(folder: string){
  // folder это путь до корневой папки/uploads/
  const folderData = `${path}/${folder}`
  return folderData
}
// Метод путь до папки
async pathFile (file: string){
  // file это путь до вложенной папки "/uploads/2023-09-19"
  const PathName = `${path}/${file}`
  return  PathName
}


 // Удаляю 1 файл 
 async dellFiles(file: string) {
 // Функция existsSync проверяет на наличие папку или файл
  if(existsSync(await this.pathFile(file))){
  // Функция unlink удаляет файл
    unlink(await this.pathFile(file))
  }else{
  throw new NotFoundException('Такой файл отсутствует')
    };
   };

 
// Удаление папки
async removeFoolder(folder: string){
     // Функция existsSync проверяет на наличие папку или файл
  if(existsSync(await this.pathFolder(folder))){
    //Функция remove удаляет папку
    remove(await this.pathFolder(folder))
  }else{
    throw new NotFoundException('Такая папка отсутствует')
  };
 };

async allFiles(
  @Res() res: Response, file: string, folder:string,
  @Next() next: NextFunction ) {
//  const allFilesPath = `${path}/uploads/2023-09-19`
//  const allFolderPath = `${path}/uploads/`

//Метод fs.readdirSync() 
//используется для синхронного чтения содержимого данного каталога. 
//Метод возвращает массив со всеми именами файлов или объектов в каталоге.

try {
  const allFolder =  readdirSync(await this.pathFolder(folder));
  const allFile =  readdirSync(await this.pathFile(file));
  const obj = {folder: allFolder, file:allFile };
     return res.send(obj)
} catch (error) {
  if(error){
    return next(new HttpError(404,'Корневая папка или вложенная отсутствует'))
   };
  };
 };


}
*/




