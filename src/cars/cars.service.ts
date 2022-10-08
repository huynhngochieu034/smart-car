import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './schemas/car.schema';
import { Model } from 'mongoose';
import { UpdateLocationCarDto } from './dto/update-location-car.dto';
import { createQueryBuilder } from 'src/utils/queryBuilder';
import { FilterCar } from './dto/filter-car.dto';
import { LocationsHistoryService } from 'src/locations-history/locations-history.service';
import { CreateLocationsHistoryDto } from 'src/locations-history/dto/create-location-history.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    private readonly locationsHistoryService: LocationsHistoryService,
  ) {}

  async create(createCarDto: CreateCarDto) {
    return await this.carModel.create(createCarDto);
  }

  async updateLocation(updateLocationCarDto: UpdateLocationCarDto) {
    const car = await this.carModel.findOne({
      deviceId: updateLocationCarDto.deviceId,
    });

    if (car) {
      await this.carModel.updateOne({ _id: car._id }, updateLocationCarDto);

      const isExistValidator =
        await this.locationsHistoryService.findOneByCondition({
          deviceId: updateLocationCarDto.deviceId,
          startTime: { $lte: new Date(updateLocationCarDto.timestamp) },
          endTime: { $gte: new Date(updateLocationCarDto.timestamp) },
        });

      if (!isExistValidator) {
        const createM2eValidator = new CreateLocationsHistoryDto();
        createM2eValidator.deviceId = updateLocationCarDto.deviceId;
        createM2eValidator.startTime = new Date(updateLocationCarDto.timestamp);
        createM2eValidator.endTime = new Date(updateLocationCarDto.timestamp);
        createM2eValidator.gps = [{longitude: updateLocationCarDto.longitude, latitude: updateLocationCarDto.latitude}];
        await this.locationsHistoryService.create(createM2eValidator);
      } else {
        if (isExistValidator.gps[isExistValidator.gps.length - 1]) {
          const check :any = isExistValidator.gps[isExistValidator.gps.length - 1];
          if (check?.longitude !== updateLocationCarDto.longitude && check?.latitude !== updateLocationCarDto.latitude) {
            isExistValidator.gps.push({longitude: updateLocationCarDto.longitude, latitude: updateLocationCarDto.latitude});
            isExistValidator.save();
          }
        }
      }
    }
  }

  async findAll(filter: FilterCar) {
    const queryBuilder = createQueryBuilder(filter);

    if (!filter.page) filter.page = 0;
    if (!filter.sortBy) filter.sortBy = '-createdAt';

    const findQuery = this.carModel
      .find(queryBuilder)
      .skip(filter.page)
      .sort(filter.sortBy);

    if (filter.size) {
      findQuery.limit(Number(filter.size));
      findQuery.skip(Number(filter.page) * Number(filter.size));
    }

    const results = await findQuery;
    const count = await this.carModel.countDocuments(queryBuilder);
    return { results, count };
  }

  async findOneById(id: string) {
    return await this.carModel.findOne({ _id: id });
  }

  async update(updateCarDto: UpdateCarDto) {
    await this.carModel.findByIdAndUpdate(updateCarDto);
    return 'Update car successfully';
  }

  async remove(id: string) {
    return await this.carModel.deleteOne({ _id: id });
  }
}
