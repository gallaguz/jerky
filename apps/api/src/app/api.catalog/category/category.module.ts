import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UUUIDService } from '../../common/uuid.service';

@Module({
    controllers: [CategoryController],
    providers: [UUUIDService, CategoryService],
})
export class CategoryModule {}
