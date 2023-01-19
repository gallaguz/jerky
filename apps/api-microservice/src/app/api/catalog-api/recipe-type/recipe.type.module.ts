import { Module } from '@nestjs/common';

import { RecipeTypeController } from './recipe.type.controller';
import { RecipeTypeService } from './recipe.type.service';

@Module({
    controllers: [RecipeTypeController],
    providers: [RecipeTypeService],
})
export class RecipeTypeModule {}
