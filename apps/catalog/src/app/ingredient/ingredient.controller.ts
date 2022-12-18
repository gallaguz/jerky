import { Controller, Body, ValidationPipe } from '@nestjs/common';
import { IngredientService } from './services/ingredient.service';
import {
    IngredientCreate,
    IngredientFindFiltered,
    IngredientFindOneUuid,
    IngredientRemove,
    IngredientUpdate,
} from '@jerky/contracts';
import { RMQError, RMQRoute, RMQValidate } from 'nestjs-rmq';
import { IController } from '../common';
import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { IngredientFindOneTitle } from '@jerky/contracts';
import { plainToInstance } from 'class-transformer';
import { ERROR_TYPE } from 'nestjs-rmq/dist/constants';
import { validate } from 'class-validator';

@Controller()
export class IngredientController implements IController<Ingredient> {
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
    @RMQRoute(IngredientFindOneUuid.topic)
    public async findOneUuid(
        @Body() props: IngredientFindOneUuid.Request,
    ): Promise<IngredientFindOneUuid.Response> {
        return await this.ingredientService.findOneUuid(props);
    }

    @RMQValidate()
    @RMQRoute(IngredientFindOneTitle.topic)
    public async findOneTitle(
        @Body() props: IngredientFindOneTitle.Request,
    ): Promise<IngredientFindOneTitle.Response> {
        return await this.ingredientService.findOneTitle(props);
    }

    @RMQValidate()
    @RMQRoute(IngredientUpdate.topic)
    public async update(
        @Body() props: IngredientUpdate.Request,
    ): Promise<IngredientUpdate.Response> {
        // return await this.validateContract(IngredientUpdate.Request, props);

        return await this.ingredientService.update(props);
    }

    @RMQValidate()
    @RMQRoute(IngredientRemove.topic)
    public async remove(
        @Body() props: IngredientRemove.Request,
    ): Promise<IngredientRemove.Response> {
        return this.ingredientService.remove(props);
    }

    public async validateContract(contract: any, props: any): Promise<any> {
        const transformed = plainToInstance(contract, props);
        const validated = await validate(transformed);

        if (validated.length > 0) {
            const validationPipe = new ValidationPipe();
            const exceptionFactory = validationPipe.createExceptionFactory();

            throw new RMQError(
                validated.toString(),
                ERROR_TYPE.RMQ,
                400,
                exceptionFactory(validated),
            );
        }

        return transformed;
    }
}
