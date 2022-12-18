import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { RawModule } from './raw/raw.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { ENVConfig } from '../config/env.config';
import { RMQConfig } from '../config/rmq.config';
import { RecipeTypeModule } from './recipe.type/recipe.type.module';
import { TagModule } from './tag/tag.module';

@Module({
    imports: [
        ConfigModule.forRoot(ENVConfig()),
        RMQModule.forRootAsync(RMQConfig()),
        DatabaseModule,
        CategoryModule,
        ProductModule,
        RawModule,
        IngredientModule,
        RecipeModule,
        RecipeTypeModule,
        TagModule,
    ],
    providers: [],
})
export class CatalogModule {}
