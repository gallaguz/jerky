import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseService } from '../database/database.service';
import { CategoryRepository } from './category.repository';

@Module({
    controllers: [CategoryController],
    providers: [DatabaseService, CategoryService, CategoryRepository],
})
export class CategoryModule {}
