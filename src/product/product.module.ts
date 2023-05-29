import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from 'src/store/store.module';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
@Module({
  imports: [TypeOrmModule.forFeature([Product]), StoreModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
