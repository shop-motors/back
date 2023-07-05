import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Request, UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {Query} from '@nestjs/common/decorators'
@ApiTags('vehicles')
@Controller('vehicles')
@ApiBearerAuth()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() createVehicleDto: CreateVehicleDto, @Request() req) {
    return this.vehiclesService.create(createVehicleDto, req.user.id);
  }

  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'The page number (starts from 0)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'The number of items per page (default to 12)',
  })
  @Get('')
  findAll(@Query('page') page = 0, @Query('limit') limit = 12) {
    return this.vehiclesService.findAll(page, limit);
  }
  

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    console.log(`Controller com o id ${id}`)
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
