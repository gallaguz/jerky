import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './category.controller';
import { DatabaseService } from '../database/database.service';
import { CategoryRepository } from './category.repository';
import { CategoryCreateService } from './services/category.create.service';
import { CategoryUpdateService } from './services/category.update.service';
import { CategoryRemoveService } from './services/category.remove.service';
import { CategoryFindService } from './services/category.find.service';

@Module({
    controllers: [CategoryController],
    providers: [
        DatabaseService,

        CategoryService,
        CategoryRepository,
        CategoryCreateService,
        CategoryUpdateService,
        CategoryRemoveService,
        CategoryFindService,
    ],
})
export class CategoryModule {}
