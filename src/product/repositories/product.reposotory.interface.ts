import { BaseInterfaceRepository } from '../../common/repository/base.interface.repository';
import { Product } from '../entities/product.entity';

export interface IProductRepository extends BaseInterfaceRepository<Product> {
  create(createEntityData: Product);
  fetchAll(): Promise<Product[]>;
}
