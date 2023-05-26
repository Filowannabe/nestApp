import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { IStoreRepository } from './store.reposotory.interface';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}
  async create(store: Store) {
    const newStore = this.storeRepository.create(store);
    await this.storeRepository.save(newStore);
  }

  async fetchAll(): Promise<Store[]> {
    return await this.storeRepository.find();
  }
}
