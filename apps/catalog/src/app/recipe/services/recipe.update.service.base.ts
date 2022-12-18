import { RecipeUpdate } from '@jerky/contracts';
import { Prisma, Recipe } from '@prisma/client/scripts/catalog-client';
import RecipeUpdateInput = Prisma.RecipeUpdateInput;
import { RecipeRepository } from '../recipe.repository';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BaseService, IUpdateServiceBase } from '../../common';
import RecipeWhereUniqueInput = Prisma.RecipeWhereUniqueInput;
import { RecipeEntity } from '../recipe.entity';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export abstract class RecipeUpdateServiceBase
    extends BaseService
    implements
        IUpdateServiceBase<
            RecipeUpdate.Request,
            Recipe,
            RecipeEntity,
            RecipeUpdateInput,
            string
        >
{
    protected constructor(
        private readonly recipeRepository: RecipeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async updateBase(props: RecipeUpdate.Request): Promise<Recipe> {
        const existed: Recipe | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const entity: RecipeEntity = this.createEntityBase(props);
        entity.update(props);

        const updateInput: RecipeUpdateInput = this.updateQueryBase(entity);
        const updated: Recipe = await this.recipeRepository.update(
            entity.uuid,
            updateInput,
        );
        if (!updated) throw new BadRequestException();

        await this.emitUpdateEventBase(entity, existed, updated);

        return updated;
    }

    public updateQueryBase(entity: RecipeEntity): RecipeUpdateInput {
        return {
            title: entity.title,
            description: entity.description,
            raw: {
                connect: { uuid: entity.rawUuid },
            },
            category: {
                connect: { uuid: entity.categoryUuid },
            },
            recipeType: {
                connect: { uuid: entity.recipeTypeUuid },
            },
        };
    }

    public createEntityBase(props: RecipeUpdate.Request): RecipeEntity {
        return new RecipeEntity(props);
    }

    public async isExistBase(uuid: string): Promise<Recipe | null> {
        const findOneUuidInput: RecipeWhereUniqueInput = { uuid };
        return await this.recipeRepository.findOneUuid(findOneUuidInput);
    }

    public async emitUpdateEventBase(
        entity: RecipeEntity,
        existed: Recipe,
        updated: Recipe,
    ): Promise<void> {
        entity.updateEvent(existed, updated);
        await this.handle(entity);
    }
}
