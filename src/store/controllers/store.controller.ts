import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreService } from '../services/store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto) {
    return await this.storeService.create(createStoreDto);
  }

  @Get()
  async findAll() {
    return await this.storeService.findAll();
  }
}
