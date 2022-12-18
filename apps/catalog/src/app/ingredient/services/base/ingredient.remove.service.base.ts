import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';

import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService, IRemoveServiceBase } from '../../../common';
import { RMQService } from 'nestjs-rmq';
import { IngredientRemove } from '@jerky/contracts';
import { IngredientRepository } from '../../ingredient.repository';
import { IngredientEntity } from '../../ingredient.entity';
import IngredientWhereUniqueInput = Prisma.IngredientWhereUniqueInput;

@Injectable()
export abstract class IngredientRemoveServiceBase
    extends BaseService
    implements
        IRemoveServiceBase<
            IngredientRemove.Request,
            Ingredient,
            IngredientEntity,
            IngredientWhereUniqueInput
        >
{
    protected constructor(
        private readonly ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async removeBase(
        props: IngredientRemove.Request,
    ): Promise<Ingredient> {
        const removeInput: IngredientWhereUniqueInput =
            this.removeQueryBase(props);
        const removed: Ingredient = await this.ingredientRepository.remove(
            removeInput,
        );
        if (!removed) throw new NotFoundException();

        const entity = new IngredientEntity(removed);

        await this.emitRemoveEventBase(entity, removed);

        return removed;
    }

    removeQueryBase(
        props: IngredientRemove.Request,
    ): IngredientWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    public async emitRemoveEventBase(
        entity: IngredientEntity,
        removed: Ingredient,
    ): Promise<void> {
        entity.removeEvent(removed);
        await this.handle(entity);
    }
}
