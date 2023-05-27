import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpResponse } from 'src/shared/HttpResponse';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from '../repositories/product.repository';
@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<HttpResponse> {
    await this.productRepository.create(createProductDto);
    return HttpResponse.create(HttpStatus.OK, { message: 'Product created' });
  }

  async fetchAll(): Promise<HttpResponse> {
    const allProducts = await this.productRepository.fetchAll();
    return HttpResponse.create(HttpStatus.OK, allProducts);
  }

  async fetchById(id: string): Promise<HttpResponse> {
    const product = await this.productRepository.fetchById(id);
    return HttpResponse.create(HttpStatus.OK, product);
  }

  async updateInventoryQuantity(
    id: string,
    inventoryQuantity: number,
  ): Promise<HttpResponse> {
    const product = await this.productRepository.updateInventoryQuantity(
      id,
      inventoryQuantity,
    );
    return HttpResponse.create(HttpStatus.OK, product);
  }
}
