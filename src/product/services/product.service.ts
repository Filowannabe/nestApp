import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpResponse } from '../../shared/HttpResponse';
import HttpStatusCode from '../../shared/HttpStatusCode';
import { StoreRepository } from '../../store/repositories/store.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from '../repositories/product.repository';
@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private storeRepository: StoreRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<HttpResponse> {
    try {
      const { name, storeId } = createProductDto;
      const productToFind = await this.productRepository.fetchByNameAndStoreId(
        name,
        storeId,
      );

      const storeToFind = await this.storeRepository.fetchById(storeId);
      if (!storeToFind) {
        return HttpResponse.create(HttpStatus.NOT_FOUND, {
          message: 'Store does not exists.',
        });
      }
      if (productToFind) {
        return HttpResponse.create(HttpStatus.PRECONDITION_FAILED, {
          message: 'Product already exists.',
        });
      }
      await this.productRepository.create(createProductDto);
      return HttpResponse.create(HttpStatus.OK, { message: 'Product created' });
    } catch (error) {
      return HttpResponse.create(HttpStatusCode.ERROR, {
        status: 'error',
        message: error.message,
      });
    }
  }

  async fetchAll(): Promise<HttpResponse> {
    try {
      const allProducts = await this.productRepository.fetchAll();
      return HttpResponse.create(HttpStatus.OK, allProducts);
    } catch (error) {
      return HttpResponse.create(HttpStatusCode.ERROR, {
        status: 'error',
        message: error.message,
      });
    }
  }

  async fetchById(id: string): Promise<HttpResponse> {
    try {
      const product = await this.productRepository.fetchById(id);
      if (!product) {
        return HttpResponse.create(HttpStatus.NOT_FOUND, {
          message: 'Product does not exits',
        });
      }
      return HttpResponse.create(HttpStatus.OK, product);
    } catch (error) {
      return HttpResponse.create(HttpStatusCode.ERROR, {
        status: 'error',
        message: error.message,
      });
    }
  }

  async updateInventoryQuantity(
    id: string,
    inventoryQuantity: number,
  ): Promise<HttpResponse> {
    try {
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
    } catch (error) {
      return HttpResponse.create(HttpStatusCode.ERROR, {
        status: 'error',
        message: error.message,
      });
    }
  }
}
