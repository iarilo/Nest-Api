import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import { Types } from "mongoose";
import { ID_VALIDATION_ERROR } from "./ad-validation.constanta";


//Валидация переданного _id

@Injectable()
export class IdValidationPipes implements PipeTransform{
    //1) значение величина value
    //2) значение metadata  где распологается данный декоратор  
    transform(value: string, metadata: ArgumentMetadata){
 if(metadata.type != 'param'){
   return value;
 };
// isValid   Проверяю параметр на валидность

if(!Types.ObjectId.isValid(value)){
throw new BadRequestException(ID_VALIDATION_ERROR)
};
return value;

 }
}