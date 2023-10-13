import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TopLevelCategory } from "../top-page.model/top-page.model";

 
   export class TopPageAdvantagesDto {
   @IsString()
    title: string;
    @IsString()
    description: string;
  }


   export class HhDataDto {
    @IsString()
    count: string;
    @IsNumber()
    juniorSalary: number;
    @IsNumber()
    middleSalary: number;
    @IsNumber()
    seniorSalary: number;
    @IsDate()
    updatedAt: Date;
  }
  

export class DocumentTopPageDto {
   
    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;

    @IsString()
    secondCategory: string;

    @IsString()
    alias: string;

    @IsString()
    title: string;

    @IsString()
    category: string;
  
    @IsOptional()
    @ValidateNested()
    @Type(()=> HhDataDto)
    hh?: HhDataDto;

  
    @IsArray()
    @ValidateNested()
    @Type(()=> TopPageAdvantagesDto)
    advantages: [TopPageAdvantagesDto];

    @IsString()
    seoText: string;
  
    @IsString()
    tagsTitle: string;
  
    @IsArray()
    @IsString({each: true})
    tags: [string];

}