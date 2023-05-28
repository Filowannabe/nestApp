import { Store } from '../entities/store.entity';

export interface IStoreRepository {
  create(createEntityData: Store);
  fetchAll(search: string): Promise<Store[]>;
}
