import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/roles/schemas/role.schema';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: User.name, timestamps: true })
export class User {

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: Role.name, default: [] })
  roles: Role[];

  @Prop({ default: null, hidden: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
