import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '../recipe.repository';
import { Recipe } from '@prisma/client/scripts/catalog-client';
import { RecipeCreate } from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { RecipeCreateServiceBase } from './recipe.create.service.base';
import { ICreateService } from '../../common';

@Injectable()
export class RecipeCreateService
    extends RecipeCreateServiceBase
    implements ICreateService<RecipeCreate.Request, Recipe>
{
    constructor(recipeRepository: RecipeRepository, rmqService: RMQService) {
        super(recipeRepository, rmqService);
    }

    public async create(props: RecipeCreate.Request): Promise<Recipe> {
        return this.createBase(props);
    }
}
