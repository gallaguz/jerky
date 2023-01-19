import { ContractsValidationService } from '@jerky/common';
import {
    InternalRecipeTypeCreateCommandContract,
    InternalRecipeTypeFindManyQueryContract,
    InternalRecipeTypeFindOneQueryContract,
    InternalRecipeTypeRemoveCommandContract,
    InternalRecipeTypeUpdateCommandContract,
} from '@jerky/contracts';
import { IController, TRecipeTypeWithPayload } from '@jerky/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CatalogRecipeTypeService } from './catalog-recipe-type-service';

@Controller()
export class CatalogRecipeTypeController
    implements IController<TRecipeTypeWithPayload>
{
    constructor(
        private readonly catalogRecipeTypeService: CatalogRecipeTypeService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalRecipeTypeCreateCommandContract.topic)
    public async create(
        @Body() props: InternalRecipeTypeCreateCommandContract.Request,
    ): Promise<InternalRecipeTypeCreateCommandContract.Response> {
        const validated: InternalRecipeTypeCreateCommandContract.Request =
            await this.validationService.validateContract(
                InternalRecipeTypeCreateCommandContract.Request,
                props,
            );
        return await this.catalogRecipeTypeService.create(validated);
    }

    @RMQRoute(InternalRecipeTypeUpdateCommandContract.topic)
    public async update(
        @Body() props: InternalRecipeTypeUpdateCommandContract.Request,
    ): Promise<InternalRecipeTypeUpdateCommandContract.Response> {
        const validated: InternalRecipeTypeUpdateCommandContract.Request =
            await this.validationService.validateContract(
                InternalRecipeTypeUpdateCommandContract.Request,
                props,
            );
        return await this.catalogRecipeTypeService.update(validated);
    }

    @RMQRoute(InternalRecipeTypeRemoveCommandContract.topic)
    public async remove(
        @Body() props: InternalRecipeTypeRemoveCommandContract.Request,
    ): Promise<InternalRecipeTypeRemoveCommandContract.Response> {
        const validated: InternalRecipeTypeRemoveCommandContract.Request =
            await this.validationService.validateContract(
                InternalRecipeTypeRemoveCommandContract.Request,
                props,
            );
        return await this.catalogRecipeTypeService.remove(validated);
    }

    @RMQRoute(InternalRecipeTypeFindOneQueryContract.topic)
    public async findOne(
        @Body() props: InternalRecipeTypeFindOneQueryContract.Request,
    ): Promise<InternalRecipeTypeFindOneQueryContract.Response> {
        const validated: InternalRecipeTypeFindOneQueryContract.Request =
            await this.validationService.validateContract(
                InternalRecipeTypeFindOneQueryContract.Request,
                props,
            );
        return await this.catalogRecipeTypeService.findOne(validated);
    }

    @RMQRoute(InternalRecipeTypeFindManyQueryContract.topic)
    public async findMany(
        @Body() props: InternalRecipeTypeFindManyQueryContract.Request,
    ): Promise<InternalRecipeTypeFindManyQueryContract.Response> {
        const validated: InternalRecipeTypeFindManyQueryContract.Request =
            await this.validationService.validateContract(
                InternalRecipeTypeFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return await this.catalogRecipeTypeService.findMany(validated);
    }
}
