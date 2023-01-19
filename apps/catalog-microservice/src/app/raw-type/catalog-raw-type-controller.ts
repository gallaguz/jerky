import { ContractsValidationService } from '@jerky/common';
import {
    InternalRawTypeCreateCommandContract,
    InternalRawTypeFindManyQueryContract,
    InternalRawTypeFindOneQueryContract,
    InternalRawTypeRemoveCommandContract,
    InternalRawTypeUpdateCommandContract,
} from '@jerky/contracts';
import { IController, TRawTypeWithPayload } from '@jerky/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CatalogRawTypeService } from './catalog-raw-type.service';

@Controller()
export class CatalogRawTypeController
    implements IController<TRawTypeWithPayload>
{
    constructor(
        private readonly catalogRawTypeService: CatalogRawTypeService,
        private readonly contractsValidationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalRawTypeCreateCommandContract.topic)
    public async create(
        @Body() props: InternalRawTypeCreateCommandContract.Request,
    ): Promise<InternalRawTypeCreateCommandContract.Response> {
        const validated: InternalRawTypeCreateCommandContract.Request =
            await this.contractsValidationService.validateContract(
                InternalRawTypeCreateCommandContract.Request,
                props,
            );
        return await this.catalogRawTypeService.create(validated);
    }

    @RMQRoute(InternalRawTypeUpdateCommandContract.topic)
    public async update(
        @Body() props: InternalRawTypeUpdateCommandContract.Request,
    ): Promise<InternalRawTypeUpdateCommandContract.Response> {
        const validated: InternalRawTypeUpdateCommandContract.Request =
            await this.contractsValidationService.validateContract(
                InternalRawTypeUpdateCommandContract.Request,
                props,
            );
        return await this.catalogRawTypeService.update(validated);
    }

    @RMQRoute(InternalRawTypeRemoveCommandContract.topic)
    public async remove(
        @Body() props: InternalRawTypeRemoveCommandContract.Request,
    ): Promise<InternalRawTypeRemoveCommandContract.Response> {
        const validated: InternalRawTypeRemoveCommandContract.Request =
            await this.contractsValidationService.validateContract(
                InternalRawTypeRemoveCommandContract.Request,
                props,
            );
        return await this.catalogRawTypeService.remove(validated);
    }

    @RMQRoute(InternalRawTypeFindOneQueryContract.topic)
    public async findOne(
        @Body() props: InternalRawTypeFindOneQueryContract.Request,
    ): Promise<InternalRawTypeFindOneQueryContract.Response> {
        const validated: InternalRawTypeFindOneQueryContract.Request =
            await this.contractsValidationService.validateContract(
                InternalRawTypeFindOneQueryContract.Request,
                props,
            );
        return await this.catalogRawTypeService.findOne(validated);
    }

    @RMQRoute(InternalRawTypeFindManyQueryContract.topic)
    public async findMany(
        @Body() props: InternalRawTypeFindManyQueryContract.Request,
    ): Promise<InternalRawTypeFindManyQueryContract.Response> {
        const validated: InternalRawTypeFindManyQueryContract.Request =
            await this.contractsValidationService.validateContract(
                InternalRawTypeFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return await this.catalogRawTypeService.findMany(validated);
    }
}
