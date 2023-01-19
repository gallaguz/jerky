import { ContractsValidationService } from '@jerky/common';
import { Module } from '@nestjs/common';

import { EventService } from '../../common';
import { DatabaseModule } from '../../database/database.module';
import { CatalogProductService } from './catalog-product.service';
import { CatalogProductController } from './catalog-product-controller';
import { CatalogProductRepository } from './catalog-product-repository';

@Module({
    imports: [DatabaseModule],
    controllers: [CatalogProductController],
    providers: [
        CatalogProductRepository,
        CatalogProductService,
        EventService,
        ContractsValidationService,
    ],
})
export class CatalogProductModule {}
