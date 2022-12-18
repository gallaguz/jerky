import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client/scripts/catalog-client';
import {
    RecipeCreate,
    RecipeFindFiltered,
    RecipeFindOneUuid,
    RecipeRemove,
    RecipeUpdate,
} from '@jerky/contracts';
import { RecipeCreateService } from './recipe.create.service';
import { RecipeFindOneTitle } from '@jerky/contracts';
import { RecipeUpdateService } from './recipe.update.service';
import { RecipeFindService } from './recipe.find.service';
import { RecipeRemoveService } from './recipe.remove.service';
import { IBaseService } from '../../common';

@Injectable()
export class RecipeService
    implements
        IBaseService<
            Recipe,
            RecipeCreate.Request,
            RecipeFindFiltered.Request,
            RecipeFindOneUuid.Request,
            RecipeFindOneTitle.Request,
            RecipeUpdate.Request,
            RecipeRemove.Request
        >
{
    constructor(
        private readonly recipeCreateService: RecipeCreateService,
        private readonly recipeUpdateService: RecipeUpdateService,
        private readonly recipeFindService: RecipeFindService,
        private readonly recipeRemoveService: RecipeRemoveService,
    ) {}

    public async create(props: RecipeCreate.Request): Promise<Recipe> {
        return this.recipeCreateService.create(props);
    }

    public async findFiltered(
        props: RecipeFindFiltered.Request,
    ): Promise<Recipe[]> {
        return await this.recipeFindService.findFiltered(props);
    }

    public async findOneUuid(
        props: RecipeFindOneUuid.Request,
    ): Promise<Recipe> {
        return await this.recipeFindService.findOneUuid(props);
    }

    public async findOneTitle(
        props: RecipeFindOneTitle.Request,
    ): Promise<Recipe> {
        return await this.recipeFindService.findOneTitle(props);
    }

    public async update(props: RecipeUpdate.Request): Promise<Recipe> {
        return await this.recipeUpdateService.update(props);
    }

    public async remove(props: RecipeRemove.Request): Promise<Recipe> {
        return await this.recipeRemoveService.remove(props);
    }
}
