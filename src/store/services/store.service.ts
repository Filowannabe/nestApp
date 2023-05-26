import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreRepository } from '../repositories/store.repository';
@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  create(createStoreDto: CreateStoreDto) {
    return this.storeRepository.create(createStoreDto);
  }

  findAll() {
    return this.storeRepository.fetchAll();
  }
}
