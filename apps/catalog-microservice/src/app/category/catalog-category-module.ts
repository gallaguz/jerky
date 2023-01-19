import { Module } from '@nestjs/common';

import { ContractsValidationService } from '../../../../../libs/common/src/lib/contracts-validation.service';
import { EventService } from '../../common';
import { DatabaseModule } from '../../database/database.module';
import { CatalogCategoryController } from './catalog-category-controller';
import { CatalogCategoryRepository } from './catalog-category-repository';
import { CatalogCategoryService } from './catalog-category-service';

@Module({
    imports: [DatabaseModule],
    controllers: [CatalogCategoryController],
    providers: [
        CatalogCategoryRepository,
        CatalogCategoryService,
        EventService,
        ContractsValidationService,
    ],
})
export class CatalogCategoryModule {}
