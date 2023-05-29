import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from './controllers/store.controller';
import { Store } from './entities/store.entity';
import { StoreRepository } from './repositories/store.repository';
import { StoreService } from './services/store.service';
@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [StoreRepository],
})
export class StoreModule {}
