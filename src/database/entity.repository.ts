import { Repository } from 'typeorm';

export abstract class EntityRepository<T> {
  constructor(protected readonly entityModel: Repository<T>) {}

  async create(createEntityData: T) {
    const entity = this.entityModel.create(createEntityData);
    return this.entityModel.save(entity);
  }
}
