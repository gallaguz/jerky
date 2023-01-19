import { ContractsValidationService } from '@jerky/common';
import { Module } from '@nestjs/common';

import { EventService } from '../../common';
import { DatabaseModule } from '../../database/database.module';
import { CatalogRecipeTypeController } from './catalog-recipe-type-controller';
import { CatalogRecipeTypeRepository } from './catalog-recipe-type-repository';
import { CatalogRecipeTypeService } from './catalog-recipe-type-service';

@Module({
    imports: [DatabaseModule],
    controllers: [CatalogRecipeTypeController],
    providers: [
        CatalogRecipeTypeRepository,
        CatalogRecipeTypeService,
        EventService,
        ContractsValidationService,
    ],
})
export class CatalogRecipeTypeModule {}
