import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createQueryBuilder } from 'src/utils/queryBuilder';
import { FilterLocationsHistoryDto } from './dto/filter-location-history.dto';
import {
  LocationsHistory,
  LocationsHistoryDocument,
} from './schemas/locations-history.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocationsHistoryService {
  constructor(
    @InjectModel(LocationsHistory.name)
    private locationsHistoryModel: Model<LocationsHistoryDocument>,
  ) {}

  async findOneByCondition(filter: any) {
    return await this.locationsHistoryModel.findOne(filter);
  }

  async create(createDto: any) {
    return await this.locationsHistoryModel.create(createDto);
  }

  async findAll(filter: FilterLocationsHistoryDto) {
    const queryBuilder = createQueryBuilder(filter);

    const findQuery = await this.locationsHistoryModel.find(queryBuilder);

    return findQuery;
  }
}
