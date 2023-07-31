import { DeepPartial } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): Promise<T>;
}
