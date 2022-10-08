import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FilterCar } from './dto/filter-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { UpdateLocationCarDto } from './dto/update-location-car.dto';

@ApiBearerAuth()
@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Post('/update-location')
  updateLocation(@Body() updateLocationCarDto: UpdateLocationCarDto) {
    return this.carsService.updateLocation(updateLocationCarDto);
  }

  @UseGuards(AuthGuard)
  @Get('/get-all')
  findAll(@Query() filter: FilterCar) {
    return this.carsService.findAll(filter);
  }

  @UseGuards(AuthGuard)
  @Get('/get-one/:id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Put('/update')
  update(@Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(updateCarDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
