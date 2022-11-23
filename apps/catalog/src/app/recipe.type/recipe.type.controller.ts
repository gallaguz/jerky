import { Body, Controller } from '@nestjs/common';
import { RecipeTypeService } from './recipe.type.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
    RecipeTypeCreate,
    RecipeTypeFindFiltered,
    RecipeTypeFindOne,
    RecipeTypeRemove,
    RecipeTypeUpdate,
} from '@jerky/contracts';

@Controller()
export class RecipeTypeController {
    constructor(private readonly recipeTypeService: RecipeTypeService) {}

    @RMQValidate()
    @RMQRoute(RecipeTypeCreate.topic)
    public async create(
        @Body() props: RecipeTypeCreate.Request,
    ): Promise<RecipeTypeCreate.Response> {
        return await this.recipeTypeService.create(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeTypeFindFiltered.topic)
    public async findFiltered(
        @Body() props: RecipeTypeFindFiltered.Request,
    ): Promise<RecipeTypeFindFiltered.Response> {
        return await this.recipeTypeService.findFiltered(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeTypeFindOne.topic)
    public async findOne(
        @Body() props: RecipeTypeFindOne.Request,
    ): Promise<RecipeTypeFindOne.Response> {
        return await this.recipeTypeService.findOne(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeTypeUpdate.topic)
    public async update(
        @Body() props: RecipeTypeUpdate.Request,
    ): Promise<RecipeTypeUpdate.Response> {
        return await this.recipeTypeService.update(props);
    }

    @RMQValidate()
    @RMQRoute(RecipeTypeRemove.topic)
    public async remove(
        @Body() props: RecipeTypeRemove.Request,
    ): Promise<RecipeTypeRemove.Response> {
        return await this.recipeTypeService.remove(props);
    }
}
