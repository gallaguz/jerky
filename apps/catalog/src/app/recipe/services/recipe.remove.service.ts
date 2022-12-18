import { RecipeRemove } from '@jerky/contracts';
import { RecipeRepository } from '../recipe.repository';
import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { RecipeRemoveServiceBase } from './recipe.remove.service.base';
import { IRemoveService } from '../../common';

@Injectable()
export class RecipeRemoveService
    extends RecipeRemoveServiceBase
    implements IRemoveService<RecipeRemove.Request, Recipe>
{
    constructor(recipeRepository: RecipeRepository, rmqService: RMQService) {
        super(recipeRepository, rmqService);
    }

    public async remove(props: RecipeRemove.Request): Promise<Recipe> {
        return await this.removeBase(props);
    }
}
