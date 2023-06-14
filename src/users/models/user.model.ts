import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
//Создаю модель
@Schema()
export class User {
	//Prop  свойство
	//	required обязательно
	@Prop({ required: true })
	email: string;
	@Prop({ required: true })
	password: string;

	@Prop([String])
	images: string[];
}

//Создаю схему
export const UserSchema = SchemaFactory.createForClass(User);
