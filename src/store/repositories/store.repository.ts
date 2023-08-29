import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { BaseAbstractRepository } from '../../common/repository/base.abstract.repository';
import { Store } from '../entities/store.entity';
import { IStoreRepository } from './store.reposotory.interface';

@Injectable()
export class StoreRepository
  extends BaseAbstractRepository<Store>
  implements IStoreRepository
{
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {
    super(storeRepository);
  }

  async fetchByName(name: string): Promise<Store> {
    return await this.storeRepository.findOne({
      where: { name },
    });
  }

  async findAllMiddleware(search: string): Promise<Store[]> {
    let options: FindManyOptions<Store> = {
      order: {
        createdAt: 'DESC',
      },
    };
    if (search) {
      options = {
        where: {
          name: Like(`%${search}%`),
        },
      };
    }
    return await this.findAll(options);
  }
}
