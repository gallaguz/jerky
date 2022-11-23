import { Module } from '@nestjs/common';
import { RecipeTypeService } from './recipe.type.service';
import { RecipeTypeController } from './recipe.type.controller';

@Module({
    controllers: [RecipeTypeController],
    providers: [RecipeTypeService],
})
export class RecipeTypeModule {}
