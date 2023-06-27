import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './auth.model/auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
  ) {}

  async getAuth(email: string) {
    return this.authModel.findOne({ email });
  }

  async createAuth(dto: AuthDto) {
    const newAuth = new this.authModel(dto);
    return newAuth.save();
  }
}
