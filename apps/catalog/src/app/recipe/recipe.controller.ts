import { Body, Controller } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
    RecipeCreate,
    RecipeFindFiltered,
    RecipeFindOne,
    RecipeRemove,
    RecipeUpdate,
} from '@jerky/contracts';

@Controller()
export class RecipeController {
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
    @RMQRoute(RecipeFindOne.topic)
    public async findOne(
        @Body() props: RecipeFindOne.Request,
    ): Promise<RecipeFindOne.Response> {
        return await this.recipeService.findOne(props);
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
