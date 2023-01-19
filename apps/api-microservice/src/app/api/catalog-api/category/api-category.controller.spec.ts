import { Test, TestingModule } from '@nestjs/testing';

import { ApiCategoryService } from './api-category.service';
import { ApiCategoryController } from './api-category-controller';

describe('CategoryController', () => {
    let controller: ApiCategoryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ApiCategoryController],
            providers: [ApiCategoryService],
        }).compile();

        controller = module.get<ApiCategoryController>(ApiCategoryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
