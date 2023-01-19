import {
    InternalRawCreateCommandContract,
    InternalRawFindManyQueryContract,
    InternalRawFindOneQueryContract,
    InternalRawRemoveCommandContract,
    InternalRawUpdateCommandContract,
} from '@jerky/contracts';
import { IBaseService, TRawWithPayload } from '@jerky/interfaces';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventService } from '../../common';
import { CatalogRawEntity } from './catalog-raw-entity';
import { CatalogRawRepository } from './catalog-raw-repository';

@Injectable()
export class CatalogRawService
    implements
        IBaseService<
            TRawWithPayload,
            InternalRawCreateCommandContract.Request,
            InternalRawUpdateCommandContract.Request,
            InternalRawRemoveCommandContract.Request,
            InternalRawFindManyQueryContract.Request,
            InternalRawFindOneQueryContract.Request
        >
{
    constructor(
        private readonly catalogRawRepository: CatalogRawRepository,
        private readonly eventService: EventService,
    ) {}

    public async create(
        props: InternalRawCreateCommandContract.Request,
    ): Promise<TRawWithPayload> {
        const existed: TRawWithPayload | null =
            await this.catalogRawRepository.findOne({
                where: { title: props.data.title },
            });
        if (existed) throw new ConflictException();

        const created: TRawWithPayload = await this.catalogRawRepository.create(
            props,
        );
        if (!created) throw new BadRequestException();

        const entity: CatalogRawEntity = new CatalogRawEntity(props.data);
        await this.eventService.emitCreateEventBase(entity, created, props);

        return created;
    }

    public async update(
        props: InternalRawUpdateCommandContract.Request,
    ): Promise<TRawWithPayload> {
        const existed: TRawWithPayload | null =
            await this.catalogRawRepository.findOne({
                where: { uuid: props.where.uuid },
            });
        if (!existed) throw new NotFoundException();

        const updated: TRawWithPayload = await this.catalogRawRepository.update(
            props,
        );
        if (!updated) throw new BadRequestException();

        const entity: CatalogRawEntity = new CatalogRawEntity(existed).update(
            props.data,
        );
        await this.eventService.emitUpdateEventBase(
            entity,
            existed,
            updated,
            props,
        );
        return updated;
    }

    public async remove(
        props: InternalRawRemoveCommandContract.Request,
    ): Promise<TRawWithPayload> {
        const removed: TRawWithPayload = await this.catalogRawRepository.remove(
            props,
        );
        if (!removed) throw new NotFoundException();

        const entity: CatalogRawEntity = new CatalogRawEntity(removed);
        await this.eventService.emitRemoveEventBase(entity, removed, props);

        return removed;
    }

    public async findOne(
        props: InternalRawFindOneQueryContract.Request,
    ): Promise<TRawWithPayload> {
        const existed: TRawWithPayload | null =
            await this.catalogRawRepository.findOne(props);
        if (!existed) throw new NotFoundException();

        return existed;
    }

    public async findMany(
        props: InternalRawFindManyQueryContract.Request,
    ): Promise<TRawWithPayload[]> {
        return await this.catalogRawRepository.findMany(props);
    }
}
