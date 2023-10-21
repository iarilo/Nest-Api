import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";


 // Функция получения config
export const getJwtConfig = async (configService: ConfigService):
Promise<JwtModuleOptions> => {
return{
    secret: configService.get('JWT_SECRET'),
    signOptions: {expiresIn: '30d'}// когда истикает
    // expaer
 }
}
