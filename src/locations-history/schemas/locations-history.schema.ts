import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LocationsHistoryDocument = LocationsHistory & Document;

@Schema({ collection: LocationsHistory.name, timestamps: true })
export class LocationsHistory {
  @Prop({ unique: true, required: true, index: true })
  deviceId: string;

  @Prop({ index: true })
  startTime: Date;

  @Prop({ index: true })
  endTime: Date;

  @Prop({ default: [] })
  gps: [{ longitude: number; latitude: number; }];
}

export const LocationsHistorySchema =
  SchemaFactory.createForClass(LocationsHistory);
