import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import dotenv from './config/Dotenv';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { Store } from './store/entities/store.entity';
import { StoreModule } from './store/store.module';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Store, Product],
      synchronize: false,
    }),
    StoreModule,
    ProductModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
