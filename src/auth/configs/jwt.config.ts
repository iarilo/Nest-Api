import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";


 // Функция получения config
 //getJwtConfig
 
  export const getJwtConfig  = async(configService: ConfigService):
   Promise<JwtModuleOptions> => {
 return{secret: configService.get('JWT_SECRET')}
  }





/*
export const getJwtConfig = async (configService: ConfigService):
Promise<JwtModuleOptions> => {
return{
    secret: configService.get('JWT_SECRET')
    // expaer
 }
}
*/