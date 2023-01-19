import {
    InternalRecipeFindOneQueryContract,
    InternalRecipeTypeCreateCommandContract,
    InternalRecipeTypeFindManyQueryContract,
    InternalRecipeTypeFindOneQueryContract,
    InternalRecipeTypeRemoveCommandContract,
    InternalRecipeTypeUpdateCommandContract,
} from '@jerky/contracts';
import { IBaseService, TRecipeTypeWithPayload } from '@jerky/interfaces';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventService } from '../../common';
import { CatalogRecipeTypeEntity } from './catalog-recipe-type-entity';
import { CatalogRecipeTypeRepository } from './catalog-recipe-type-repository';

@Injectable()
export class CatalogRecipeTypeService
    implements
        IBaseService<
            TRecipeTypeWithPayload,
            InternalRecipeTypeCreateCommandContract.Request,
            InternalRecipeTypeUpdateCommandContract.Request,
            InternalRecipeTypeRemoveCommandContract.Request,
            InternalRecipeTypeFindManyQueryContract.Request,
            InternalRecipeFindOneQueryContract.Request
        >
{
    constructor(
        private readonly catalogRecipeTypeRepository: CatalogRecipeTypeRepository,
        private readonly eventService: EventService,
    ) {}

    public async create(
        props: InternalRecipeTypeCreateCommandContract.Request,
    ): Promise<TRecipeTypeWithPayload> {
        const existed: TRecipeTypeWithPayload | null =
            await this.catalogRecipeTypeRepository.findOne({
                where: { title: props.data.title },
            });
        if (existed) throw new ConflictException();

        const entity: CatalogRecipeTypeEntity = new CatalogRecipeTypeEntity(
            props.data,
        );

        const created: TRecipeTypeWithPayload =
            await this.catalogRecipeTypeRepository.create(props);
        if (!created) throw new BadRequestException();

        await this.eventService.emitCreateEventBase(entity, created, props);
        return created;
    }
    public async update(
        props: InternalRecipeTypeUpdateCommandContract.Request,
    ): Promise<TRecipeTypeWithPayload> {
        const existed: TRecipeTypeWithPayload | null =
            await this.catalogRecipeTypeRepository.findOne({
                where: { uuid: props.where.uuid },
            });
        if (!existed) throw new NotFoundException();

        const entity: CatalogRecipeTypeEntity = new CatalogRecipeTypeEntity(
            existed,
        ).update(props.data);

        const updated: TRecipeTypeWithPayload =
            await this.catalogRecipeTypeRepository.update(props);
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
        props: InternalRecipeTypeRemoveCommandContract.Request,
    ): Promise<TRecipeTypeWithPayload> {
        const removed = await this.catalogRecipeTypeRepository.remove(props);
        if (!removed) throw new NotFoundException();

        const entity: CatalogRecipeTypeEntity = new CatalogRecipeTypeEntity(
            removed,
        );
        await this.eventService.emitRemoveEventBase(entity, removed, props);
        return removed;
    }

    public async findOne(
        props: InternalRecipeTypeFindOneQueryContract.Request,
    ): Promise<TRecipeTypeWithPayload> {
        const existed: TRecipeTypeWithPayload | null =
            await this.catalogRecipeTypeRepository.findOne(props);
        if (!existed) throw new NotFoundException();

        return existed;
    }
    public async findMany(
        props: InternalRecipeTypeFindManyQueryContract.Request,
    ): Promise<TRecipeTypeWithPayload[]> {
        return await this.catalogRecipeTypeRepository.findMany(props);
    }
}
