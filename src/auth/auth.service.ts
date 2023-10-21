import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument, UserModel } from './auth.model/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth-constants';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<userDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  async allUser(dto: AuthDto): Promise<AuthDto[]> {
    return this.userModel.find(dto);
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const pass = await compare(password, user.passwordHash);
    if (!pass) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async login(email: string, response: Response) {
    const payload = { email };
    //signAsync()функцию для генерации нашего JWT
    const jwt = await this.jwtService.signAsync(payload);

    //'jwt' название jwt tokena
    // сохраняю  jwt в  файле cookies
    // Свойство {httpOnly: true} даёт возможность использовать jwt только на сервере. 
    response.cookie('jwt', jwt, {httpOnly: true});
    return { access_tocen: jwt };
  }

  // Куки

  // Добавляю пользователя прошедшего проверку подлиности
  async User(req: Request, res: Response) {
   try {
  const cookie = req.cookies['jwt'];
  //verifyAsync()функцию для проверки нашего JWT
  const data = await this.jwtService.verifyAsync(cookie);
  if (!data) {
    throw new UnauthorizedException();
  }
  // Ищю пользователя по id  данных из cookie
  const user = await this.userModel.findOne({ id: data['id'] });
  //const {passwordHash,...result} = user;
  return user;

} catch (err) {
  throw new UnauthorizedException('Нет данных cookie');
}
    
  }

  // ===========================================================

  // async logout(response: Response) {
  //   response.clearCookie('jwt');
  //   return{
  //     message: 'Разлогинерся'
  //   }
  // };
}

/*
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<userDocument>,
    private readonly jwtService: JwtService
  ) {}


// Создаю пользователя
async createUser(dto: AuthDto) {
 const salt = await genSalt(10);
 const newUser =  new this.userModel({
  email: dto.login,
  passwordHash: await hash(dto.password,salt)
 })
 return newUser.save();
 
};
// Поиск пользователя по emzail
async findUser(email: string) {
return this.userModel.findOne({email}).exec()
};

// Нахожу пользователя и сравниваю пароль
// Возврощаю email из модели:  Promise<Pick<UserModel,'email'>>
async validateUser (email: string, password: string): Promise<Pick<UserModel,'email'>>{
  // Ищю пользователя
  const user = await this.findUser(email);
  // Если пользователя нет
  if(!user) {
    throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
  };
  // Проверка на совпадение пароля
  const isCorrectPassword = await compare(password, user.passwordHash);
  if(!isCorrectPassword){
    throw new UnprocessableEntityException(WRONG_PASSWORD_ERROR);
   };
   // Возврощаю email пользователя
    return {email: user.email};
  };
// Метод для шифрования email с помощью jwt токена  
async login(email: string) {
  // дата шыфрования
const payload = {email};
// Возврощаю jwt токена 
// функция signAsync подписывает jwt токена 
return{access_tocen: await this.jwtService.signAsync(payload)}

 };
}
*/
