import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpResponse } from 'src/shared/HttpResponse';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreRepository } from '../repositories/store.repository';
@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async create(createStoreDto: CreateStoreDto): Promise<HttpResponse> {
    await this.storeRepository.create(createStoreDto);
    return HttpResponse.create(HttpStatus.OK, { message: 'Store created' });
  }

  async findAll(): Promise<HttpResponse> {
    const allStores = await this.storeRepository.fetchAll();
    return HttpResponse.create(HttpStatus.OK, allStores);
  }
}
