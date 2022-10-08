import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterLocationsHistoryDto } from './dto/filter-location-history.dto';
import { LocationsHistoryService } from './locations-history.service';

@ApiBearerAuth()
@ApiTags('locations-history')
@Controller('locations-history')
export class LocationsHistoryController {
  constructor(private readonly locationsHistoryService: LocationsHistoryService) {}

  @Get('/get-all')
  findOne(@Query() filter: FilterLocationsHistoryDto) {
    return this.locationsHistoryService.findAll(filter);
  }

}
