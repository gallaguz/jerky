import { ContractsValidationService } from '@jerky/common';
import {
    InternalCategoryCreateCommandContract,
    InternalCategoryFindManyQueryContract,
    InternalCategoryFindOneQueryContract,
    InternalCategoryRemoveCommandContract,
    InternalCategoryUpdateCommandContract,
} from '@jerky/contracts';
import { IController, TCategoryWithPayload } from '@jerky/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CatalogCategoryService } from './catalog-category-service';

@Controller()
export class CatalogCategoryController
    implements IController<TCategoryWithPayload>
{
    constructor(
        private readonly categoryService: CatalogCategoryService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalCategoryCreateCommandContract.topic)
    public async create(
        @Body() props: InternalCategoryCreateCommandContract.Request,
    ): Promise<InternalCategoryCreateCommandContract.Response> {
        const validated: InternalCategoryCreateCommandContract.Request =
            await this.validationService.validateContract(
                InternalCategoryCreateCommandContract.Request,
                props,
            );
        return await this.categoryService.create(validated);
    }

    @RMQRoute(InternalCategoryUpdateCommandContract.topic)
    public async update(
        @Body() props: InternalCategoryUpdateCommandContract.Request,
    ): Promise<InternalCategoryUpdateCommandContract.Response> {
        const validated: InternalCategoryUpdateCommandContract.Request =
            await this.validationService.validateContract(
                InternalCategoryUpdateCommandContract.Request,
                props,
            );
        return await this.categoryService.update(validated);
    }

    @RMQRoute(InternalCategoryRemoveCommandContract.topic)
    public async remove(
        @Body() props: InternalCategoryRemoveCommandContract.Request,
    ): Promise<InternalCategoryRemoveCommandContract.Response> {
        const validated: InternalCategoryRemoveCommandContract.Request =
            await this.validationService.validateContract(
                InternalCategoryRemoveCommandContract.Request,
                props,
            );
        return await this.categoryService.remove(validated);
    }

    @RMQRoute(InternalCategoryFindOneQueryContract.topic)
    public async findOne(
        @Body() props: InternalCategoryFindOneQueryContract.Request,
    ): Promise<InternalCategoryFindOneQueryContract.Response> {
        const validated: InternalCategoryFindOneQueryContract.Request =
            await this.validationService.validateContract(
                InternalCategoryFindOneQueryContract.Request,
                props,
            );
        return await this.categoryService.findOne(validated);
    }

    @RMQRoute(InternalCategoryFindManyQueryContract.topic)
    public async findMany(
        @Body() props: InternalCategoryFindManyQueryContract.Request,
    ): Promise<InternalCategoryFindManyQueryContract.Response> {
        const validated: InternalCategoryFindManyQueryContract.Request =
            await this.validationService.validateContract(
                InternalCategoryFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return await this.categoryService.findMany(validated);
    }
}
