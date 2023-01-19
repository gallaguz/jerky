import {
    InternalCategoryCreateCommandContract,
    InternalCategoryFindManyQueryContract,
    InternalCategoryFindOneQueryContract,
    InternalCategoryRemoveCommandContract,
    InternalCategoryUpdateCommandContract,
} from '@jerky/contracts';
import { IBaseService, TCategoryWithPayload } from '@jerky/interfaces';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventService } from '../../common';
import { CatalogCategoryEntity } from './catalog-category-entity';
import { CatalogCategoryRepository } from './catalog-category-repository';

@Injectable()
export class CatalogCategoryService
    implements
        IBaseService<
            TCategoryWithPayload,
            InternalCategoryCreateCommandContract.Request,
            InternalCategoryUpdateCommandContract.Request,
            InternalCategoryRemoveCommandContract.Request,
            InternalCategoryFindManyQueryContract.Request,
            InternalCategoryFindOneQueryContract.Request
        >
{
    constructor(
        private readonly catalogCategoryRepository: CatalogCategoryRepository,
        private readonly eventService: EventService,
    ) {}
    public async create(
        props: InternalCategoryCreateCommandContract.Request,
    ): Promise<TCategoryWithPayload> {
        const existed: TCategoryWithPayload | null =
            await this.catalogCategoryRepository.findOne({
                where: { title: props.data.title },
            });
        if (existed) throw new ConflictException();

        const created: TCategoryWithPayload =
            await this.catalogCategoryRepository.create(props);
        if (!created) throw new BadRequestException();

        const entity: CatalogCategoryEntity = new CatalogCategoryEntity(
            props.data,
        );
        await this.eventService.emitCreateEventBase(entity, created, props);

        return created;
    }

    public async update(
        props: InternalCategoryUpdateCommandContract.Request,
    ): Promise<TCategoryWithPayload> {
        const existed: TCategoryWithPayload | null =
            await this.catalogCategoryRepository.findOne({
                where: { uuid: props.where.uuid },
            });
        if (!existed) throw new NotFoundException();

        const updated: TCategoryWithPayload =
            await this.catalogCategoryRepository.update(props);
        if (!updated) throw new BadRequestException();

        const entity: CatalogCategoryEntity = new CatalogCategoryEntity(
            existed,
        ).update(props.data);

        await this.eventService.emitUpdateEventBase(
            entity,
            existed,
            updated,
            props,
        );
        return updated;
    }

    public async remove(
        props: InternalCategoryRemoveCommandContract.Request,
    ): Promise<TCategoryWithPayload> {
        const removed: TCategoryWithPayload =
            await this.catalogCategoryRepository.remove(props);
        if (!removed) throw new NotFoundException();

        const entity: CatalogCategoryEntity = new CatalogCategoryEntity(
            removed,
        );
        await this.eventService.emitRemoveEventBase(entity, removed, props);

        return removed;
    }

    public async findOne(
        props: InternalCategoryFindOneQueryContract.Request,
    ): Promise<TCategoryWithPayload> {
        const existed: TCategoryWithPayload | null =
            await this.catalogCategoryRepository.findOne(props);
        if (!existed) throw new NotFoundException();

        return existed;
    }

    public async findMany(
        props: InternalCategoryFindManyQueryContract.Request,
    ): Promise<TCategoryWithPayload[]> {
        return await this.catalogCategoryRepository.findMany(props);
    }
}
