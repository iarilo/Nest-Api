
// Пишу свой тип: для Express.Multer.File, 
// что-бы можно было создать инстонс Express.Multer.File



export class MFile{
  originalname: string;
  buffer: Buffer;

    constructor( file: Express.Multer.File | MFile){
    this.originalname = file.originalname,
    this.buffer = file.buffer
  };
};






















/*
export class MFile{
    originalname: string;
    buffer: Buffer;
    constructor(file: Express.Multer.File | MFile){
    this.originalname = file.originalname,
    this.buffer = file.buffer   
  };
 };
*/































