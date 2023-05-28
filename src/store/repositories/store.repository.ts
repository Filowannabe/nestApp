import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  async fetchById(id: string): Promise<Store> {
    return await this.storeRepository.findOne({
      where: { id },
    });
  }

  async fetchByName(name: string): Promise<Store> {
    return await this.storeRepository.findOne({
      where: { name },
    });
  }

  async fetchAll(search: string): Promise<Store[]> {
    if (search) {
      return await this.storeRepository.find({
        where: {
          name: Like(`%${search}%`),
        },
        order: {
          createdAt: 'DESC',
        },
      });
    }
    return await this.storeRepository.find();
  }
}
