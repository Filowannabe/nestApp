import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    const product: Product = {
      ...createProductDto,
      inventoryUpdatedTime: new Date(),
    };
    return await this.productRepository.create(product);
  }

  async fetchAll() {
    return await this.productRepository.fetchAll();
  }

  async fetchById(id: string) {
    return await this.productRepository.fetchById(id);
  }

  async updateInventoryQuantity(id: string, inventoryQuantity: number) {
    return await this.productRepository.updateInventoryQuantity(
      id,
      inventoryQuantity,
    );
  }
}
