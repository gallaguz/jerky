import {
    InternalRawTypeCreateCommandContract,
    InternalRawTypeFindManyQueryContract,
    InternalRawTypeFindOneQueryContract,
    InternalRawTypeRemoveCommandContract,
    InternalRawTypeUpdateCommandContract,
} from '@jerky/contracts';
import { IBaseService, TRawTypeWithPayload } from '@jerky/interfaces';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventService } from '../../common';
import { CatalogRawTypeEntity } from './catalog-raw-type-entity';
import { CatalogRawTypeRepository } from './catalog-raw-type-repository';

@Injectable()
export class CatalogRawTypeService
    implements
        IBaseService<
            TRawTypeWithPayload,
            InternalRawTypeCreateCommandContract.Request,
            InternalRawTypeUpdateCommandContract.Request,
            InternalRawTypeRemoveCommandContract.Request,
            InternalRawTypeFindManyQueryContract.Request,
            InternalRawTypeFindOneQueryContract.Request
        >
{
    constructor(
        private readonly catalogRawTypeRepository: CatalogRawTypeRepository,
        private readonly eventService: EventService,
    ) {}
    public async create(
        props: InternalRawTypeCreateCommandContract.Request,
    ): Promise<TRawTypeWithPayload> {
        const existed: TRawTypeWithPayload | null =
            await this.catalogRawTypeRepository.findOne({
                where: { title: props.data.title },
            });
        if (existed) throw new ConflictException();

        const entity: CatalogRawTypeEntity = new CatalogRawTypeEntity(
            props.data,
        );

        const created: TRawTypeWithPayload =
            await this.catalogRawTypeRepository.create({
                ...props,
                data: {
                    alias: entity.alias,
                    title: entity.title,
                    description: entity.description,
                },
            });
        if (!created) throw new BadRequestException();

        await this.eventService.emitCreateEventBase(entity, created, props);
        return created;
    }
    public async update(
        props: InternalRawTypeUpdateCommandContract.Request,
    ): Promise<TRawTypeWithPayload> {
        const existed: TRawTypeWithPayload | null =
            await this.catalogRawTypeRepository.findOne({
                where: { uuid: props.where.uuid },
            });
        if (!existed) throw new NotFoundException();

        const entity: CatalogRawTypeEntity = new CatalogRawTypeEntity(existed);
        entity.update(props.data);

        const updated: TRawTypeWithPayload =
            await this.catalogRawTypeRepository.update(props);
        if (!updated) throw new BadRequestException();

        await this.eventService.emitUpdateEventBase(
            entity,
            existed,
            updated,
            props,
        );
        return updated;
    }
    public async remove(
        props: InternalRawTypeRemoveCommandContract.Request,
    ): Promise<TRawTypeWithPayload> {
        const removed = await this.catalogRawTypeRepository.remove(props);
        if (!removed) throw new NotFoundException();

        const entity = new CatalogRawTypeEntity(removed);

        await this.eventService.emitRemoveEventBase(entity, removed, props);

        return removed;
    }
    public async findOne(
        props: InternalRawTypeFindOneQueryContract.Request,
    ): Promise<TRawTypeWithPayload> {
        const existed = await this.catalogRawTypeRepository.findOne(props);
        if (!existed) throw new NotFoundException();
        return existed;
    }
    public async findMany(
        props: InternalRawTypeFindManyQueryContract.Request,
    ): Promise<TRawTypeWithPayload[]> {
        return await this.catalogRawTypeRepository.findMany(props);
    }
}
