import {
    InternalIngredientCreateCommandContract,
    InternalIngredientFindManyQueryContract,
    InternalIngredientFindOneQueryContract,
    InternalIngredientRemoveCommandContract,
    InternalIngredientUpdateCommandContract,
} from '@jerky/contracts';
import { IBaseService, TIngredientWithPayload } from '@jerky/interfaces';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventService } from '../../common';
import { CatalogIngredientEntity } from './catalog-ingredient-entity';
import { CatalogIngredientRepository } from './catalog-ingredient-repository';

@Injectable()
export class CatalogIngredientService
    implements
        IBaseService<
            TIngredientWithPayload,
            InternalIngredientCreateCommandContract.Request,
            InternalIngredientUpdateCommandContract.Request,
            InternalIngredientRemoveCommandContract.Request,
            InternalIngredientFindManyQueryContract.Request,
            InternalIngredientFindOneQueryContract.Request
        >
{
    constructor(
        private readonly ingredientRepository: CatalogIngredientRepository,
        private readonly eventService: EventService,
    ) {}

    public async create(
        props: InternalIngredientCreateCommandContract.Request,
    ): Promise<TIngredientWithPayload> {
        const existed: TIngredientWithPayload | null =
            await this.ingredientRepository.findOne({
                where: { title: props.data.title },
            });
        if (existed) throw new ConflictException();

        const created: TIngredientWithPayload =
            await this.ingredientRepository.create(props);
        if (!created) throw new BadRequestException();

        const entity: CatalogIngredientEntity = new CatalogIngredientEntity(
            props.data,
        );
        await this.eventService.emitCreateEventBase(entity, created, props);

        return created;
    }

    public async update(
        props: InternalIngredientUpdateCommandContract.Request,
    ): Promise<TIngredientWithPayload> {
        const existed: TIngredientWithPayload | null =
            await this.ingredientRepository.findOne({
                where: { uuid: props.where.uuid },
            });
        if (!existed) throw new NotFoundException();

        const updated: TIngredientWithPayload =
            await this.ingredientRepository.update(props);
        if (!updated) throw new BadRequestException();

        const entity: CatalogIngredientEntity = new CatalogIngredientEntity(
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
        props: InternalIngredientRemoveCommandContract.Request,
    ): Promise<TIngredientWithPayload> {
        const removed: TIngredientWithPayload =
            await this.ingredientRepository.remove(props);
        if (!removed) throw new NotFoundException();

        const entity: CatalogIngredientEntity = new CatalogIngredientEntity(
            removed,
        );
        await this.eventService.emitRemoveEventBase(entity, removed, props);

        return removed;
    }

    public async findOne(
        props: InternalIngredientFindOneQueryContract.Request,
    ): Promise<TIngredientWithPayload> {
        const existed: TIngredientWithPayload | null =
            await this.ingredientRepository.findOne(props);
        if (!existed) throw new NotFoundException();

        return existed;
    }
    public async findMany(
        props: InternalIngredientFindManyQueryContract.Request,
    ): Promise<TIngredientWithPayload[]> {
        return await this.ingredientRepository.findMany(props);
    }
}
