import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { IProductRepository } from './product.reposotory.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(product: Product) {
    const newProduct = this.productRepository.create(product);
    await this.productRepository.save(newProduct);
  }

  async fetchAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async fetchById(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async updateInventoryQuantity(
    id: string,
    inventoryQuantity: number,
  ): Promise<Product> {
    return await this.productRepository.save({
      id: id,
      inventoryQuantity: inventoryQuantity,
      inventoryUpdatedTime: new Date(),
    });
  }
}
