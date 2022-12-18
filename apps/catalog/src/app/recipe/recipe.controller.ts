import { Body, Controller } from '@nestjs/common';
import { RecipeService } from './services/recipe.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
    RecipeCreate,
    RecipeFindFiltered,
    RecipeFindOneTitle,
    RecipeFindOneUuid,
    RecipeRemove,
    RecipeUpdate,
} from '@jerky/contracts';
import { IController } from '../common/controller.interface';
import { Recipe } from '@prisma/client/scripts/catalog-client';

@Controller()
export class RecipeController implements IController<Recipe> {
    constructor(private readonly recipeService: RecipeService) {}

    @RMQValidate()
    @RMQRoute(RecipeCreate.topic)
    public async create(
        @Body() props: RecipeCreate.Request,
    ): Promise<RecipeCreate.Response> {
        return await this.recipeService.create(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeFindFiltered.topic)
    public async findFiltered(
        @Body() props: RecipeFindFiltered.Request,
    ): Promise<RecipeFindFiltered.Response> {
        return await this.recipeService.findFiltered(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeFindOneUuid.topic)
    public async findOneUuid(
        @Body() props: RecipeFindOneUuid.Request,
    ): Promise<RecipeFindOneUuid.Response> {
        return await this.recipeService.findOneUuid(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeFindOneTitle.topic)
    public async findOneTitle(
        @Body() props: RecipeFindOneTitle.Request,
    ): Promise<RecipeFindOneTitle.Response> {
        return await this.recipeService.findOneTitle(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeUpdate.topic)
    public async update(
        @Body() props: RecipeUpdate.Request,
    ): Promise<RecipeUpdate.Response> {
        return await this.recipeService.update(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeRemove.topic)
    public async remove(
        @Body() props: RecipeRemove.Request,
    ): Promise<RecipeRemove.Response> {
        return await this.recipeService.remove(props);
    }
}
