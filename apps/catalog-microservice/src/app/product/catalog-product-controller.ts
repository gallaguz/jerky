import { ContractsValidationService } from '@jerky/common';
import {
    InternalProductCreateCommandContract,
    InternalProductFindManyQueryContract,
    InternalProductFindOneQueryContract,
    InternalProductRemoveCommandContract,
    InternalProductUpdateCommandContract,
} from '@jerky/contracts';
import { IController, TProductWithPayload } from '@jerky/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CatalogProductService } from './catalog-product.service';

@Controller()
export class CatalogProductController
    implements IController<TProductWithPayload>
{
    constructor(
        private readonly catalogProductService: CatalogProductService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalProductCreateCommandContract.topic)
    public async create(
        @Body() props: InternalProductCreateCommandContract.Request,
    ): Promise<InternalProductCreateCommandContract.Response> {
        const validated: InternalProductCreateCommandContract.Request =
            await this.validationService.validateContract(
                InternalProductCreateCommandContract.Request,
                props,
            );
        return await this.catalogProductService.create(validated);
    }

    @RMQRoute(InternalProductUpdateCommandContract.topic)
    public async update(
        @Body() props: InternalProductUpdateCommandContract.Request,
    ): Promise<InternalProductUpdateCommandContract.Response> {
        const validated: InternalProductUpdateCommandContract.Request =
            await this.validationService.validateContract(
                InternalProductUpdateCommandContract.Request,
                props,
            );
        return await this.catalogProductService.update(validated);
    }

    @RMQRoute(InternalProductRemoveCommandContract.topic)
    public async remove(
        @Body() props: InternalProductRemoveCommandContract.Request,
    ): Promise<InternalProductRemoveCommandContract.Response> {
        const validated: InternalProductRemoveCommandContract.Request =
            await this.validationService.validateContract(
                InternalProductRemoveCommandContract.Request,
                props,
            );
        return await this.catalogProductService.remove(validated);
    }

    @RMQRoute(InternalProductFindOneQueryContract.topic)
    public async findOne(
        @Body() props: InternalProductFindOneQueryContract.Request,
    ): Promise<InternalProductFindOneQueryContract.Response> {
        const validated: InternalProductFindOneQueryContract.Request =
            await this.validationService.validateContract(
                InternalProductFindOneQueryContract.Request,
                props,
            );
        return await this.catalogProductService.findOne(validated);
    }

    @RMQRoute(InternalProductFindManyQueryContract.topic)
    public async findMany(
        @Body() props: InternalProductFindManyQueryContract.Request,
    ): Promise<InternalProductFindManyQueryContract.Response> {
        const validated: InternalProductFindManyQueryContract.Request =
            await this.validationService.validateContract(
                InternalProductFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return await this.catalogProductService.findMany(validated);
    }
}
