import { NestApplication } from '@nestjs/core';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { ProductController } from './product.controller';
import { Product } from '@prisma/client/scripts/catalog-client';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../../config/env.config';
import { ProductModule } from './product.module';

describe(`[ Product Controller ]`, () => {
    let app: NestApplication;
    let productController: ProductController;
    let rmqService: RMQTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                ProductModule,
            ],
        }).compile();

        app = module.createNestApplication();
        productController = app.get<ProductController>(ProductController);
        rmqService = app.get(RMQService);
        await app.init();
    });

    describe(`[ RMQ ] CRUD`, () => {
        const products: Product[] = [];

        it('[ app ] toBeDefined', function () {
            expect(app).toBeDefined();
        });
    });
});
