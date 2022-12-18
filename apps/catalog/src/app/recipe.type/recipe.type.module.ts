import { Module } from '@nestjs/common';
import { RecipeTypeService } from './services/recipe.type.service';
import { RecipeTypeController } from './recipe.type.controller';
import { RecipeTypeRepository } from './recipe.type.repository';
import { DatabaseService } from '../database/database.service';
import { RecipeTypeCreateService } from './services/recipe.type.create.service';
import { RecipeTypeUpdateService } from './services/recipe.type.update.service';
import { RecipeTypeFindService } from './services/recipe.type.find.service';
import { RecipeTypeRemoveService } from './services/recipe.type.remove.service';

@Module({
    controllers: [RecipeTypeController],
    providers: [
        DatabaseService,
        RecipeTypeService,
        RecipeTypeRepository,
        RecipeTypeCreateService,
        RecipeTypeUpdateService,
        RecipeTypeFindService,
        RecipeTypeRemoveService,
    ],
})
export class RecipeTypeModule {}
