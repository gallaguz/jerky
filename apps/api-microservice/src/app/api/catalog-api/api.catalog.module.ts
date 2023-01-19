import { Module } from '@nestjs/common';

import { ApiCategoryModule } from './category/api-category-module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ProductModule } from './product/product.module';
import { RawModule } from './raw/raw.module';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeTypeModule } from './recipe-type/recipe.type.module';

@Module({
    imports: [
        ApiCategoryModule,
        ProductModule,
        IngredientModule,
        RecipeModule,
        RawModule,
        RecipeTypeModule,
    ],
    providers: [],
})
export class ApiCatalogModule {}
