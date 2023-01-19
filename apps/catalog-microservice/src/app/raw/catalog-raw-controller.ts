import { ContractsValidationService } from '@jerky/common';
import {
    InternalRawCreateCommandContract,
    InternalRawFindManyQueryContract,
    InternalRawFindOneQueryContract,
    InternalRawRemoveCommandContract,
    InternalRawUpdateCommandContract,
} from '@jerky/contracts';
import { IController, TRawWithPayload } from '@jerky/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CatalogRawService } from './catalog-raw-service';

@Controller()
export class CatalogRawController implements IController<TRawWithPayload> {
    constructor(
        private readonly rawService: CatalogRawService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalRawCreateCommandContract.topic)
    public async create(
        @Body() props: InternalRawCreateCommandContract.Request,
    ): Promise<InternalRawCreateCommandContract.Response> {
        const validated: InternalRawCreateCommandContract.Request =
            await this.validationService.validateContract(
                InternalRawCreateCommandContract.Request,
                props,
            );
        return await this.rawService.create(validated);
    }

    @RMQRoute(InternalRawFindManyQueryContract.topic)
    public async findMany(
        @Body() props: InternalRawFindManyQueryContract.Request,
    ): Promise<InternalRawFindManyQueryContract.Response> {
        const validated: InternalRawFindManyQueryContract.Request =
            await this.validationService.validateContract(
                InternalRawFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return await this.rawService.findMany(validated);
    }

    @RMQRoute(InternalRawFindOneQueryContract.topic)
    public async findOne(
        props: InternalRawFindOneQueryContract.Request,
    ): Promise<InternalRawFindOneQueryContract.Response> {
        const validated: InternalRawFindOneQueryContract.Request =
            await this.validationService.validateContract(
                InternalRawFindOneQueryContract.Request,
                props,
            );
        return await this.rawService.findOne(validated);
    }

    @RMQRoute(InternalRawUpdateCommandContract.topic)
    public async update(
        @Body() props: InternalRawUpdateCommandContract.Request,
    ): Promise<InternalRawUpdateCommandContract.Response> {
        const validated: InternalRawUpdateCommandContract.Request =
            await this.validationService.validateContract(
                InternalRawUpdateCommandContract.Request,
                props,
            );
        return await this.rawService.update(validated);
    }

    @RMQRoute(InternalRawRemoveCommandContract.topic)
    public async remove(
        @Body() props: InternalRawRemoveCommandContract.Request,
    ): Promise<InternalRawRemoveCommandContract.Response> {
        const validated: InternalRawRemoveCommandContract.Request =
            await this.validationService.validateContract(
                InternalRawRemoveCommandContract.Request,
                props,
            );
        return await this.rawService.remove(validated);
    }
}
