import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpResponse } from 'src/shared/HttpResponse';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreRepository } from '../repositories/store.repository';
@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async create(createStoreDto: CreateStoreDto): Promise<HttpResponse> {
    const { name } = createStoreDto;
    const storeToFind = await this.storeRepository.fetchByName(name);

    if (storeToFind) {
      return HttpResponse.create(HttpStatus.PRECONDITION_FAILED, {
        message: 'Product already exists',
      });
    }

    await this.storeRepository.create(createStoreDto);
    return HttpResponse.create(HttpStatus.OK, { message: 'Store created' });
  }

  async findAll(search: string): Promise<HttpResponse> {
    const allStores = await this.storeRepository.fetchAll(search);
    return HttpResponse.create(HttpStatus.OK, allStores);
  }
}
