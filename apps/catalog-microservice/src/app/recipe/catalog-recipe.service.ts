import {
    InternalRecipeCreateCommandContract,
    InternalRecipeFindManyQueryContract,
    InternalRecipeFindOneQueryContract,
    InternalRecipeRemoveCommandContract,
    InternalRecipeUpdateCommandContract,
} from '@jerky/contracts';
import { IBaseService, TRecipeWithPayload } from '@jerky/interfaces';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventService } from '../../common';
import { CatalogRecipeEntity } from './catalog-recipe-entity';
import { CatalogRecipeRepository } from './catalog-recipe-repository';

@Injectable()
export class CatalogRecipeService
    implements
        IBaseService<
            TRecipeWithPayload,
            InternalRecipeCreateCommandContract.Request,
            InternalRecipeUpdateCommandContract.Request,
            InternalRecipeRemoveCommandContract.Request,
            InternalRecipeFindManyQueryContract.Request,
            InternalRecipeFindOneQueryContract.Request
        >
{
    constructor(
        private readonly catalogRecipeRepository: CatalogRecipeRepository,
        private readonly eventService: EventService,
    ) {}

    public async create(
        props: InternalRecipeCreateCommandContract.Request,
    ): Promise<TRecipeWithPayload> {
        const existed: TRecipeWithPayload | null =
            await this.catalogRecipeRepository.findOne({
                where: { title: props.data.title },
            });
        if (existed) throw new ConflictException();

        const created: TRecipeWithPayload =
            await this.catalogRecipeRepository.create(props);
        if (!created) throw new BadRequestException();

        const entity: CatalogRecipeEntity = new CatalogRecipeEntity(props.data);

        await this.eventService.emitCreateEventBase(entity, created, props);

        return created;
    }

    public async update(
        props: InternalRecipeUpdateCommandContract.Request,
    ): Promise<TRecipeWithPayload> {
        const existed: TRecipeWithPayload | null =
            await this.catalogRecipeRepository.findOne({
                where: { uuid: props.where.uuid },
            });
        if (!existed) throw new NotFoundException();

        const entity: CatalogRecipeEntity = new CatalogRecipeEntity(
            existed,
        ).update(props.data);

        const updated: TRecipeWithPayload =
            await this.catalogRecipeRepository.update(props);
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
        props: InternalRecipeRemoveCommandContract.Request,
    ): Promise<TRecipeWithPayload> {
        const removed: TRecipeWithPayload =
            await this.catalogRecipeRepository.remove(props);
        if (!removed) throw new NotFoundException();

        const entity: CatalogRecipeEntity = new CatalogRecipeEntity(removed);
        await this.eventService.emitRemoveEventBase(entity, removed, props);

        return removed;
    }

    public async findOne(
        props: InternalRecipeFindOneQueryContract.Request,
    ): Promise<TRecipeWithPayload> {
        const existed = await this.catalogRecipeRepository.findOne(props);
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findMany(
        props: InternalRecipeFindManyQueryContract.Request,
    ): Promise<TRecipeWithPayload[]> {
        return await this.catalogRecipeRepository.findMany(props);
    }
}
