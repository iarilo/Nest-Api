
import {Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt'
import { UserModel } from '../auth.model/user.model';

//JwtStrategy
@Injectable()
 export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private readonly configService: ConfigService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET' )
    });
  };
  async validate ({email}: Pick<UserModel,'email'>){
   return email;
  };
 }

 



























 /*
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(private readonly configService: ConfigService){
 // Метод super получает параметры из PassportStrategy   
 super({
// Принимает запрос в качестве параметра и возвращает либо JWT  либо null .
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// Не проверять срок действия токена.  
  ignoreExpiration: true,
// Создаю секретный ключь для проверки подписи токена.
  secretOrKey: configService.get('JWT_SECRET')  
 });
};
// Метод валидации, разбирает payload, валидируя email из  метода login в AuthService.
// Получаю email из модели. 
async validate ({email}: Pick<UserModel,'email'> ){
return email;
};

}
*/