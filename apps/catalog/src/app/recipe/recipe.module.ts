import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { RecipeRepository } from './recipe.repository';
import { DatabaseService } from '../database/database.service';

@Module({
    controllers: [RecipeController],
    providers: [RecipeService, RecipeRepository, DatabaseService],
})
export class RecipeModule {}
