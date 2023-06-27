import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { Product } from '../src/product/entities/product.entity';
import { Store } from '../src/store/entities/store.entity';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  it('/ (GET)', async () => {
    // Fetch all the entities
    const entities = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Store, Product],
      synchronize: true,
    });
    entities
      .initialize()
      .then((it) => {
        const entities = it.entityMetadatas;
        for (const entity of entities) {
          const dataSource = entity.connection;
          const productRepo = dataSource.getRepository(Product);
          productRepo.delete({});
          const storeRepo = dataSource.getRepository(Store);
          storeRepo.delete({});
        }
      })
      .catch((error) => console.log(error));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer()).get('/stores').expect(200);
  });
});
