/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseInterfaceRepository } from '../../common/repository/base.interface.repository';
import { Store } from '../entities/store.entity';

export interface IStoreRepository extends BaseInterfaceRepository<Store> {}
