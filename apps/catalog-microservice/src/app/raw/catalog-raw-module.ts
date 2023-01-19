import { ContractsValidationService } from '@jerky/common';
import { Module } from '@nestjs/common';

import { EventService } from '../../common';
import { DatabaseModule } from '../../database/database.module';
import { CatalogRawController } from './catalog-raw-controller';
import { CatalogRawRepository } from './catalog-raw-repository';
import { CatalogRawService } from './catalog-raw-service';

@Module({
    imports: [DatabaseModule],
    controllers: [CatalogRawController],
    providers: [
        CatalogRawRepository,
        CatalogRawService,
        EventService,
        ContractsValidationService,
    ],
})
export class CatalogRawModule {}
