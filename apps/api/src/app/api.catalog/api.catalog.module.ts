import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { RawModule } from './raw/raw.module';
import { UUUIDService } from '../common/uuid.service';
import { RecipeTypeModule } from './recipe.type/recipe.type.module';

@Module({
    imports: [
        CategoryModule,
        ProductModule,
        IngredientModule,
        RecipeModule,
        RawModule,
        RecipeTypeModule,
    ],
    providers: [UUUIDService],
})
export class ApiCatalogModule {}
