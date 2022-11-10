import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('AppController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
        }).compile();
    });

    describe('getData', () => {
        it('should return "Welcome to product!"', () => {
            const appController = app.get<ProductController>(ProductController);
            expect(appController.getData()).toEqual({
                message: 'Welcome to product!',
            });
        });
    });
});
