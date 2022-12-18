import { RecipeRemove } from '@jerky/contracts';
import { RecipeRepository } from '../recipe.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client/scripts/catalog-client';
import RecipeWhereUniqueInput = Prisma.RecipeWhereUniqueInput;
import { RecipeEntity } from '../recipe.entity';
import { BaseService, IRemoveServiceBase } from '../../common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class RecipeRemoveServiceBase
    extends BaseService
    implements
        IRemoveServiceBase<
            RecipeRemove.Request,
            Recipe,
            RecipeEntity,
            RecipeWhereUniqueInput
        >
{
    constructor(
        private readonly recipeRepository: RecipeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async removeBase(props: RecipeRemove.Request): Promise<Recipe> {
        const removeInput: RecipeWhereUniqueInput = this.removeQueryBase(props);

        const removed = await this.recipeRepository.remove(removeInput);
        if (!removed) throw new NotFoundException();

        const entity = new RecipeEntity(removed);

        await this.emitRemoveEventBase(entity, removed);

        return removed;
    }

    public removeQueryBase(
        props: RecipeRemove.Request,
    ): RecipeWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    public async emitRemoveEventBase(
        entity: RecipeEntity,
        removed: Recipe,
    ): Promise<void> {
        entity.removeEvent(removed);
        await this.handle(entity);
    }
}
