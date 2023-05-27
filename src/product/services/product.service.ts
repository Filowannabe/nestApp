import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpResponse } from 'src/shared/HttpResponse';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from '../repositories/product.repository';
@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<HttpResponse> {
    const { name, storeId } = createProductDto;
    const productToFind = await this.productRepository.fetchByNameAndStoreId(
      name,
      storeId,
    );

    if (productToFind) {
      return HttpResponse.create(HttpStatus.PRECONDITION_FAILED, {
        message: 'Product already exists',
      });
    }
    await this.productRepository.create(createProductDto);
    return HttpResponse.create(HttpStatus.OK, { message: 'Product created' });
  }

  async fetchAll(): Promise<HttpResponse> {
    const allProducts = await this.productRepository.fetchAll();
    return HttpResponse.create(HttpStatus.OK, allProducts);
  }

  async fetchById(id: string): Promise<HttpResponse> {
    const product = await this.productRepository.fetchById(id);
    if (!product) {
      return HttpResponse.create(HttpStatus.NOT_FOUND, {
        message: 'Product does not exits',
      });
    }
    return HttpResponse.create(HttpStatus.OK, product);
  }

  async updateInventoryQuantity(
    id: string,
    inventoryQuantity: number,
  ): Promise<HttpResponse> {
    const productToFind = await this.productRepository.fetchById(id);
    if (!productToFind) {
      return HttpResponse.create(HttpStatus.NOT_FOUND, {
        message: 'Product does not exits',
      });
    }
    const product = await this.productRepository.updateInventoryQuantity(
      id,
      inventoryQuantity,
    );
    return HttpResponse.create(HttpStatus.OK, product);
  }
}
