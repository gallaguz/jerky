import { Module } from '@nestjs/common';

import { ApiCategoryService } from './api-category.service';
import { ApiCategoryController } from './api-category-controller';

@Module({
    controllers: [ApiCategoryController],
    providers: [ApiCategoryService],
})
export class ApiCategoryModule {}
