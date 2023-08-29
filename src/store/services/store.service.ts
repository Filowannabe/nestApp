import { HttpStatus, Injectable } from '@nestjs/common';
import { FindManyOptions, Like } from 'typeorm';
import { HttpResponse } from '../../common/HttpResponse';
import HttpStatusCode from '../../common/HttpStatusCode';
import { CreateStoreDto } from '../dto/create-store.dto';
import { Store } from '../entities/store.entity';
import { StoreRepository } from '../repositories/store.repository';
@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async create(createStoreDto: CreateStoreDto): Promise<HttpResponse> {
    try {
      const { name } = createStoreDto;
      const storeToFind = await this.storeRepository.fetchByName(name);

      if (storeToFind) {
        return HttpResponse.create(HttpStatus.PRECONDITION_FAILED, {
          message: 'Store already exists',
        });
      }

      await this.storeRepository.save(createStoreDto);
      return HttpResponse.create(HttpStatus.OK, { message: 'Store created' });
    } catch (error) {
      return HttpResponse.create(HttpStatusCode.ERROR, {
        status: 'error',
        message: error.message,
      });
    }
  }

  async findAll(search: string): Promise<HttpResponse> {
    try {
      let allStores: Store[];
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
        allStores = await this.storeRepository.findAll(options);
      }

      return HttpResponse.create(HttpStatus.OK, allStores);
    } catch (error) {
      return HttpResponse.create(HttpStatusCode.ERROR, {
        status: 'error',
        message: error.message,
      });
    }
  }
}
