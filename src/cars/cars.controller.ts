import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    const cars = this.carsService.findAll();

    return {
      data: cars,
      statusCode: 200,
    };
  }

  @Get(':id')
  getCarById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    const car = this.carsService.findOneById(id);
    return {
      data: car,
      statusCode: 200,
    };
  }

  @Post()
  createCar(@Body() car: CreateCarDTO) {
    return this.carsService.create(car);
  }

  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() car: UpdateCarDTO) {
    return this.carsService.update(id, car);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
