import { ContractsValidationService } from '@jerky/common';
import { Module } from '@nestjs/common';

import { EventService } from '../../common';
import { DatabaseModule } from '../../database/database.module';
import { CatalogRawTypeService } from './catalog-raw-type.service';
import { CatalogRawTypeController } from './catalog-raw-type-controller';
import { CatalogRawTypeRepository } from './catalog-raw-type-repository';

@Module({
    imports: [DatabaseModule],
    controllers: [CatalogRawTypeController],
    providers: [
        CatalogRawTypeRepository,
        CatalogRawTypeService,
        EventService,
        ContractsValidationService,
    ],
})
export class CatalogRawTypeModule {}
