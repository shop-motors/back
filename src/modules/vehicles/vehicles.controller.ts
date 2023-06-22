import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  create(@Body() createVehicleDto: CreateVehicleDto, @Request() req) {
    return this.vehiclesService.create(createVehicleDto, req.user.id);
  }

  @Get()
  findAll(userId: string) {
    return this.vehiclesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}

