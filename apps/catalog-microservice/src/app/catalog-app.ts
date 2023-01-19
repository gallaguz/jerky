import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { RmqConfig } from '../config';
import { DatabaseModule } from '../database/database.module';
import { CatalogCategoryModule } from './category/catalog-category-module';
import { CatalogIngredientModule } from './ingredient/catalog-ingredient-module';
import { CatalogProductModule } from './product/catalog-product-module';
import { CatalogRawModule } from './raw/catalog-raw-module';
import { CatalogRawTypeModule } from './raw-type/catalog-raw-type-module';
import { CatalogRecipeModule } from './recipe/catalog-recipe-module';
import { CatalogRecipeTypeModule } from './recipe-type/catalog-recipe-type-module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RMQModule.forRootAsync(RmqConfig()),
        DatabaseModule,
        CatalogCategoryModule,
        CatalogProductModule,
        CatalogRawModule,
        CatalogIngredientModule,
        CatalogRecipeModule,
        CatalogRecipeTypeModule,
        CatalogRawTypeModule,
    ],
    providers: [],
})
export class CatalogApp {}
