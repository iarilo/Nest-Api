import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth-constants';
import { Response, Request} from 'express';
import { PassThrough } from 'stream';
import { UserModel } from './auth.model/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServer: AuthService) {}
  @UsePipes(new ValidationPipe())
  //------------------------
  @Post('register')
  async register(@Body() dto: AuthDto) {
    //Проверяю есть ли такой пользователь в баззе
    const oldUser = await this.authServer.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authServer.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() { login, password }: AuthDto,
    // Свойство {passthrough: true} отправляет cookie на внешний интерфейс 
    @Res({ passthrough: true }) response: Response,
  ) {
    // Получаю email
    const user = await this.authServer.validateUser(login, password);
    // Передая email в метод login для формирования jwt
    return this.authServer.login(user.email, response);
  }

  @Get('all')
  async allUser(@Body() dto: AuthDto) {
    return this.authServer.allUser(dto);
  }

  // Куки
 @Get('cookie')
 async userCookie(@Req() req:Request, @Res() res: Response) {
  return this.authServer.User(req,res)
 }

  @Post('logout')
   // Свойство {passthrough: true} отправляет cookie на внешний интерфейс 
  async Logout(@Res({passthrough:true}) res: Response) {
    // Очищает cookie
          res.clearCookie('jwt');
      return{
        message: 'Разлогинерся'
      }
    
  }
}

/*
@Controller('auth')
export class AuthController {
  constructor(private readonly authServer: AuthService) {}
  @UsePipes(new ValidationPipe())
  //------------------------
  @Post('register')
  async register(@Body() dto: AuthDto) {
  //Проверяю есть ли такой пользователь в баззе
   const oldUser = await this.authServer.findUser(dto.login);
   if (oldUser) {
   throw new BadRequestException(ALREADY_REGISTERED_ERROR);
   };

   return this.authServer.createUser(dto)
   
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() {login, password}: AuthDto) {
    // Получаю email
   const user = await this.authServer.validateUser(login, password);
   // Передая email в метод login для формирования jwt
   return this.authServer.login(user.email);
  }
}

*/
