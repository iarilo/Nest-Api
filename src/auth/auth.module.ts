import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, AuthSchemaFactory } from './auth.model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from './configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt_strategi';


@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: AuthSchemaFactory },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
     imports:[ConfigModule],
     inject:[ConfigService],
     useFactory:getJwtConfig 
    }),
   
   PassportModule,    

  ],
  
  providers: [AuthService,JwtStrategy],

  // providers: [AuthService,JwtStrategy],

})
export class AuthModule {}


























/*
@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: AuthSchemaFactory },
    ]),
      ConfigModule,
    // Создаю JwtService  
      JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:getJwtConfig

    }),
    // Модуль паспорта  from '@nestjs/passport'
    PassportModule

  ],
  
  providers: [AuthService,JwtStrategy],

})
export class AuthModule {}
*/