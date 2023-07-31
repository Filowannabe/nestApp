import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';

interface HasId {
  id: any;
}
export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }
  async create(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  async fetchById(id: any): Promise<T> {
    const options: FindOneOptions<T> = {
      where: { id },
    };

    return await this.entity.findOne(options);
  }
}
