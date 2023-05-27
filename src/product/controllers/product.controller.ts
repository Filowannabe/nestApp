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
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.fetchAll();
  }

  @Get(':id')
  async fetchById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.productService.fetchById(id);
  }

  @Patch(':id')
  async updateInventoryQuantity(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('inventoryQuantity', ParseIntPipe) inventoryQuantity: number,
  ) {
    return await this.productService.updateInventoryQuantity(
      id,
      inventoryQuantity,
    );
  }
}
