import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/car.schema';
import { LocationsHistoryModule } from 'src/locations-history/locations-history.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    LocationsHistoryModule,
  ],
  exports: [CarsService],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
