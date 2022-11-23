import { Module } from '@nestjs/common';
import { RecipeTypeService } from './recipe.type.service';
import { RecipeTypeController } from './recipe.type.controller';
import { RecipeTypeRepository } from './recipe.type.repository';
import { DatabaseService } from '../database/database.service';

@Module({
    controllers: [RecipeTypeController],
    providers: [RecipeTypeService, RecipeTypeRepository, DatabaseService],
})
export class RecipeTypeModule {}
