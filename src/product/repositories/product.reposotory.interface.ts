/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseInterfaceRepository } from '../../common/repository/base.interface.repository';
import { Product } from '../entities/product.entity';

export interface IProductRepository extends BaseInterfaceRepository<Product> {}
