import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreRepository } from '../repositories/store.repository';
@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async create(createStoreDto: CreateStoreDto) {
    return await this.storeRepository.create(createStoreDto);
  }

  async findAll() {
    return await this.storeRepository.fetchAll();
  }
}
