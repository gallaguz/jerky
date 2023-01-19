import { ContractsValidationService } from '@jerky/common';
import {
    InternalIngredientCreateCommandContract,
    InternalIngredientFindManyQueryContract,
    InternalIngredientFindOneQueryContract,
    InternalIngredientRemoveCommandContract,
    InternalIngredientUpdateCommandContract,
} from '@jerky/contracts';
import { IController, TIngredientWithPayload } from '@jerky/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CatalogIngredientService } from './catalog-ingredient.service';

@Controller()
export class CatalogIngredientController
    implements IController<TIngredientWithPayload>
{
    constructor(
        private readonly catalogIngredientService: CatalogIngredientService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalIngredientCreateCommandContract.topic)
    public async create(
        @Body() props: InternalIngredientCreateCommandContract.Request,
    ): Promise<InternalIngredientCreateCommandContract.Response> {
        const validated: InternalIngredientCreateCommandContract.Request =
            await this.validationService.validateContract(
                InternalIngredientCreateCommandContract.Request,
                props,
            );
        return await this.catalogIngredientService.create(validated);
    }

    @RMQRoute(InternalIngredientUpdateCommandContract.topic)
    public async update(
        @Body() props: InternalIngredientUpdateCommandContract.Request,
    ): Promise<InternalIngredientUpdateCommandContract.Response> {
        const validated: InternalIngredientUpdateCommandContract.Request =
            await this.validationService.validateContract(
                InternalIngredientUpdateCommandContract.Request,
                props,
            );

        return await this.catalogIngredientService.update(validated);
    }

    @RMQRoute(InternalIngredientRemoveCommandContract.topic)
    public async remove(
        @Body() props: InternalIngredientRemoveCommandContract.Request,
    ): Promise<InternalIngredientRemoveCommandContract.Response> {
        const validated: InternalIngredientRemoveCommandContract.Request =
            await this.validationService.validateContract(
                InternalIngredientRemoveCommandContract.Request,
                props,
            );
        return this.catalogIngredientService.remove(validated);
    }

    @RMQRoute(InternalIngredientFindOneQueryContract.topic)
    public async findOne(
        @Body() props: InternalIngredientFindOneQueryContract.Request,
    ): Promise<InternalIngredientFindOneQueryContract.Response> {
        const validated: InternalIngredientFindOneQueryContract.Request =
            await this.validationService.validateContract(
                InternalIngredientFindOneQueryContract.Request,
                props,
            );
        return await this.catalogIngredientService.findOne(validated);
    }

    @RMQRoute(InternalIngredientFindManyQueryContract.topic)
    public async findMany(
        @Body() props: InternalIngredientFindManyQueryContract.Request,
    ): Promise<InternalIngredientFindManyQueryContract.Response> {
        const validated: InternalIngredientFindManyQueryContract.Request =
            await this.validationService.validateContract(
                InternalIngredientFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return await this.catalogIngredientService.findMany(validated);
    }
}
