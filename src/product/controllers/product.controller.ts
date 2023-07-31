import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from '../../common/HttpResponse';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    const httpResponse = await this.productService.create(createProductDto);
    HttpResponse.convertToExpress(response, httpResponse);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const httpResponse = await this.productService.fetchAll();
    HttpResponse.convertToExpress(response, httpResponse);
  }

  @Get(':id')
  async fetchById(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const httpResponse = await this.productService.fetchById(id);
    HttpResponse.convertToExpress(response, httpResponse);
  }

  @Patch(':id')
  async updateInventoryQuantity(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('inventoryQuantity', ParseIntPipe) inventoryQuantity: number,
  ) {
    const httpResponse = await this.productService.updateInventoryQuantity(
      id,
      inventoryQuantity,
    );
    HttpResponse.convertToExpress(response, httpResponse);
  }
}
