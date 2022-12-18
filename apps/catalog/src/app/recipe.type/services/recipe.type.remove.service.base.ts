import { RecipeType, Prisma } from '@prisma/client/scripts/catalog-client';

import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService, IRemoveServiceBase } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { RecipeTypeRemove } from '@jerky/contracts';
import RecipeTypeWhereUniqueInput = Prisma.RecipeTypeWhereUniqueInput;
import { RecipeTypeEntity } from '../recipe.type.entity';
import { RecipeTypeRepository } from '../recipe.type.repository';

@Injectable()
export class RecipeTypeRemoveServiceBase
    extends BaseService
    implements
        IRemoveServiceBase<
            RecipeTypeRemove.Request,
            RecipeType,
            RecipeTypeEntity,
            RecipeTypeWhereUniqueInput
        >
{
    constructor(
        private readonly recipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async removeBase(
        props: RecipeTypeRemove.Request,
    ): Promise<RecipeType> {
        const removeInput: RecipeTypeWhereUniqueInput =
            this.removeQueryBase(props);

        const removed = await this.recipeTypeRepository.remove(removeInput);
        if (!removed) throw new NotFoundException();

        const entity = new RecipeTypeEntity(removed);

        await this.emitRemoveEventBase(entity, removed);

        return removed;
    }

    public removeQueryBase(
        props: RecipeTypeRemove.Request,
    ): RecipeTypeWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    public async emitRemoveEventBase(
        entity: RecipeTypeEntity,
        removed: RecipeType,
    ): Promise<void> {
        entity.removeEvent(removed);
        await this.handle(entity);
    }
}
