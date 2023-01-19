import { ContractsValidationService } from '@jerky/common';
import { Module } from '@nestjs/common';

import { EventService } from '../../common';
import { DatabaseModule } from '../../database/database.module';
import { CatalogRecipeService } from './catalog-recipe.service';
import { CatalogRecipeController } from './catalog-recipe-controller';
import { CatalogRecipeRepository } from './catalog-recipe-repository';

@Module({
    imports: [DatabaseModule],
    controllers: [CatalogRecipeController],
    providers: [
        CatalogRecipeRepository,
        CatalogRecipeService,
        EventService,
        ContractsValidationService,
    ],
})
export class CatalogRecipeModule {}
