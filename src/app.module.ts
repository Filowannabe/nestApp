import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
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
      entities: [Store],
      synchronize: true,
    }),
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
