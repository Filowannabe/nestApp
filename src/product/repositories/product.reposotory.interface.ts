import { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(createEntityData: Product);
  fetchAll(): Promise<Product[]>;
}
