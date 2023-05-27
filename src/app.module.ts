import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { Store } from './store/entities/store.entity';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ape',
      password: '19971890',
      database: 'product',
      entities: [Store, Product],
      synchronize: true,
    }),
    StoreModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
