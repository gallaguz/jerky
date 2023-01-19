import {
    InternalProductCreateCommandContract,
    InternalProductFindManyQueryContract,
    InternalProductFindOneQueryContract,
    InternalProductRemoveCommandContract,
    InternalProductUpdateCommandContract,
} from '@jerky/contracts';
import { IBaseService, TProductWithPayload } from '@jerky/interfaces';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventService } from '../../common';
import { CatalogProductEntity } from './catalog-product-entity';
import { CatalogProductRepository } from './catalog-product-repository';

@Injectable()
export class CatalogProductService
    implements
        IBaseService<
            TProductWithPayload,
            InternalProductCreateCommandContract.Request,
            InternalProductUpdateCommandContract.Request,
            InternalProductRemoveCommandContract.Request,
            InternalProductFindManyQueryContract.Request,
            InternalProductFindOneQueryContract.Request
        >
{
    constructor(
        private readonly catalogProductRepository: CatalogProductRepository,
        private readonly eventService: EventService,
    ) {}

    public async create(
        props: InternalProductCreateCommandContract.Request,
    ): Promise<TProductWithPayload> {
        const existed: TProductWithPayload | null =
            await this.catalogProductRepository.findOne({
                where: { title: props.data.title },
            });
        if (existed) throw new ConflictException();

        const created: TProductWithPayload =
            await this.catalogProductRepository.create(props);
        if (!created) throw new BadRequestException();

        const entity: CatalogProductEntity = new CatalogProductEntity(
            props.data,
        );

        await this.eventService.emitCreateEventBase(entity, created, props);

        return created;
    }

    public async update(
        props: InternalProductUpdateCommandContract.Request,
    ): Promise<TProductWithPayload> {
        const existed: TProductWithPayload | null =
            await this.catalogProductRepository.findOne({
                where: { uuid: props.where.uuid },
            });
        if (!existed) throw new NotFoundException();

        const updated: TProductWithPayload =
            await this.catalogProductRepository.update(props);
        if (!updated) throw new BadRequestException();

        const entity: CatalogProductEntity = new CatalogProductEntity(
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
        props: InternalProductRemoveCommandContract.Request,
    ): Promise<TProductWithPayload> {
        const removed: TProductWithPayload =
            await this.catalogProductRepository.remove(props);
        if (!removed) throw new NotFoundException();

        const entity: CatalogProductEntity = new CatalogProductEntity(removed);
        await this.eventService.emitRemoveEventBase(entity, removed, props);

        return removed;
    }

    public async findOne(
        props: InternalProductFindOneQueryContract.Request,
    ): Promise<TProductWithPayload> {
        const existed: TProductWithPayload | null =
            await this.catalogProductRepository.findOne(props);
        if (!existed) throw new NotFoundException();

        return existed;
    }

    public async findMany(
        props: InternalProductFindManyQueryContract.Request,
    ): Promise<TProductWithPayload[]> {
        return await this.catalogProductRepository.findMany(props);
    }
}
