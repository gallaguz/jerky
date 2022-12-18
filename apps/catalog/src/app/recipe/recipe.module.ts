import { Module } from '@nestjs/common';
import { RecipeService } from './services/recipe.service';
import { RecipeController } from './recipe.controller';
import { RecipeRepository } from './recipe.repository';
import { DatabaseService } from '../database/database.service';
import { RecipeCreateService } from './services/recipe.create.service';
import { RecipeUpdateService } from './services/recipe.update.service';
import { RecipeFindService } from './services/recipe.find.service';
import { RecipeRemoveService } from './services/recipe.remove.service';

@Module({
    controllers: [RecipeController],
    providers: [
        RecipeService,
        RecipeRepository,
        DatabaseService,
        RecipeCreateService,
        RecipeUpdateService,
        RecipeFindService,
        RecipeRemoveService,
    ],
})
export class RecipeModule {}
