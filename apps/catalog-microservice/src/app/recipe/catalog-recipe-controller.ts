import { ContractsValidationService } from '@jerky/common';
import {
    InternalRecipeCreateCommandContract,
    InternalRecipeFindManyQueryContract,
    InternalRecipeFindOneQueryContract,
    InternalRecipeRemoveCommandContract,
    InternalRecipeUpdateCommandContract,
} from '@jerky/contracts';
import { IController, TRecipeWithPayload } from '@jerky/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CatalogRecipeService } from './catalog-recipe.service';

@Controller()
export class CatalogRecipeController
    implements IController<TRecipeWithPayload>
{
    constructor(
        private readonly recipeService: CatalogRecipeService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalRecipeCreateCommandContract.topic)
    public async create(
        @Body() props: InternalRecipeCreateCommandContract.Request,
    ): Promise<InternalRecipeCreateCommandContract.Response> {
        const validated: InternalRecipeCreateCommandContract.Request =
            await this.validationService.validateContract(
                InternalRecipeCreateCommandContract.Request,
                props,
            );
        return await this.recipeService.create(validated);
    }

    @RMQRoute(InternalRecipeUpdateCommandContract.topic)
    public async update(
        @Body() props: InternalRecipeUpdateCommandContract.Request,
    ): Promise<InternalRecipeUpdateCommandContract.Response> {
        const validated: InternalRecipeUpdateCommandContract.Request =
            await this.validationService.validateContract(
                InternalRecipeUpdateCommandContract.Request,
                props,
            );
        return await this.recipeService.update(validated);
    }

    @RMQRoute(InternalRecipeRemoveCommandContract.topic)
    public async remove(
        @Body() props: InternalRecipeRemoveCommandContract.Request,
    ): Promise<InternalRecipeRemoveCommandContract.Response> {
        const validated: InternalRecipeRemoveCommandContract.Request =
            await this.validationService.validateContract(
                InternalRecipeRemoveCommandContract.Request,
                props,
            );
        return await this.recipeService.remove(validated);
    }

    @RMQRoute(InternalRecipeFindOneQueryContract.topic)
    public async findOne(
        @Body() props: InternalRecipeFindOneQueryContract.Request,
    ): Promise<InternalRecipeFindOneQueryContract.Response> {
        const validated: InternalRecipeFindOneQueryContract.Request =
            await this.validationService.validateContract(
                InternalRecipeFindOneQueryContract.Request,
                props,
            );
        return await this.recipeService.findOne(validated);
    }

    @RMQRoute(InternalRecipeFindManyQueryContract.topic)
    public async findMany(
        @Body() props: InternalRecipeFindManyQueryContract.Request,
    ): Promise<InternalRecipeFindManyQueryContract.Response> {
        const validated: InternalRecipeFindManyQueryContract.Request =
            await this.validationService.validateContract(
                InternalRecipeFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return await this.recipeService.findMany(validated);
    }
}
