import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from 'src/shared/HttpResponse';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreService } from '../services/store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createStoreDto: CreateStoreDto,
  ) {
    const httpResponse = await this.storeService.create(createStoreDto);
    HttpResponse.convertToExpress(response, httpResponse);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const httpResponse = await this.storeService.findAll();
    HttpResponse.convertToExpress(response, httpResponse);
  }
}
