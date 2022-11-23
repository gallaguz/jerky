import { Controller, Body } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import {
    IngredientCreate,
    IngredientFindFiltered,
    IngredientFindOne,
    IngredientRemove,
    IngredientUpdate,
} from '@jerky/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {}

    @RMQValidate()
    @RMQRoute(IngredientCreate.topic)
    public async create(
        @Body() props: IngredientCreate.Request,
    ): Promise<IngredientCreate.Response> {
        return await this.ingredientService.create(props);
    }

    @RMQValidate()
    @RMQRoute(IngredientFindFiltered.topic)
    public async findFiltered(
        @Body() props: IngredientFindFiltered.Request,
    ): Promise<IngredientFindFiltered.Response> {
        return await this.ingredientService.findFiltered(props);
    }

    @RMQValidate()
    @RMQRoute(IngredientFindOne.topic)
    public async findOne(
        @Body() props: IngredientFindOne.Request,
    ): Promise<IngredientFindOne.Response> {
        return await this.ingredientService.findOne(props);
    }

    @RMQValidate()
    @RMQRoute(IngredientUpdate.topic)
    public async update(
        @Body() props: IngredientUpdate.Request,
    ): Promise<IngredientUpdate.Response> {
        return await this.ingredientService.update(props);
    }

    @RMQValidate()
    @RMQRoute(IngredientRemove.topic)
    public async remove(
        @Body() props: IngredientRemove.Request,
    ): Promise<IngredientRemove.Response> {
        return this.ingredientService.remove(props);
    }
}
