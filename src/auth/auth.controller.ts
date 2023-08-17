import { BadRequestException, Body, Controller, Get, HttpCode, Post,
   UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth-constants';

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
 };


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() {login, password}: AuthDto) {
    // Получаю email
   const user = await this.authServer.validateUser(login, password);
   // Передая email в метод login для формирования jwt
   return this.authServer.login(user.email);
  };

  @Get('all')
 async allUser(@Body() dto: AuthDto){
 return this.authServer.allUser(dto)
 };

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