import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { IUpdateService } from '../../common';
import { RecipeUpdate } from '@jerky/contracts';
import { RecipeRepository } from '../recipe.repository';
import { Recipe } from '@prisma/client/scripts/catalog-client';
import { RecipeUpdateServiceBase } from './recipe.update.service.base';

@Injectable()
export class RecipeUpdateService
    extends RecipeUpdateServiceBase
    implements IUpdateService<RecipeUpdate.Request, Recipe>
{
    constructor(recipeRepository: RecipeRepository, rmqService: RMQService) {
        super(recipeRepository, rmqService);
    }

    public async update(props: RecipeUpdate.Request): Promise<Recipe> {
        return await this.updateBase(props);
    }
}
