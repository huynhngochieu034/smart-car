import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CarDocument = Car & Document;

@Schema({ collection: Car.name, timestamps: true })
export class Car {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  licensePlates: string;

  @Prop({ unique: true, required: true })
  deviceId: string;

  @Prop()
  longitude: number;

  @Prop()
  latitude: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
