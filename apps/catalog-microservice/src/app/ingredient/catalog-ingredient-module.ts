import { ContractsValidationService } from '@jerky/common';
import { Module } from '@nestjs/common';

import { EventService } from '../../common';
import { DatabaseModule } from '../../database/database.module';
import { CatalogIngredientService } from './catalog-ingredient.service';
import { CatalogIngredientController } from './catalog-ingredient-controller';
import { CatalogIngredientRepository } from './catalog-ingredient-repository';

@Module({
    imports: [DatabaseModule],
    controllers: [CatalogIngredientController],
    providers: [
        CatalogIngredientRepository,
        CatalogIngredientService,
        EventService,
        ContractsValidationService,
    ],
})
export class CatalogIngredientModule {}
