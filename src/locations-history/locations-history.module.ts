import { Module } from '@nestjs/common';
import { LocationsHistoryService } from './locations-history.service';
import { LocationsHistoryController } from './locations-history.controller';
import { LocationsHistory, LocationsHistorySchema } from './schemas/locations-history.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: LocationsHistory.name, schema: LocationsHistorySchema }])],
  exports: [LocationsHistoryService],
  controllers: [LocationsHistoryController],
  providers: [LocationsHistoryService]
})
export class LocationsHistoryModule {}
