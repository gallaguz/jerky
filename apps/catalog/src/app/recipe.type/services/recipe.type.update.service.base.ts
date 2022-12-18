import { BaseService, IUpdateServiceBase } from '../../common';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { RMQService } from 'nestjs-rmq';
import { RecipeTypeRepository } from '../recipe.type.repository';
import { Prisma, RecipeType } from '@prisma/client/scripts/catalog-client';
import { RecipeTypeEntity } from '../recipe.type.entity';
import RecipeTypeUpdateInput = Prisma.RecipeTypeUpdateInput;
import RecipeTypeWhereUniqueInput = Prisma.RecipeTypeWhereUniqueInput;
import { RecipeTypeUpdate } from '@jerky/contracts';

@Injectable()
export abstract class RecipeTypeUpdateServiceBase
    extends BaseService
    implements
        IUpdateServiceBase<
            RecipeTypeUpdate.Request,
            RecipeType,
            RecipeTypeEntity,
            RecipeTypeUpdateInput,
            string
        >
{
    protected constructor(
        private readonly recipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async updateBase(
        props: RecipeTypeUpdate.Request,
    ): Promise<RecipeType> {
        const existed: RecipeType | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const entity: RecipeTypeEntity = this.createEntityBase(props);
        entity.update(props);

        const updateInput: RecipeTypeUpdateInput = this.updateQueryBase(entity);
        const updated: RecipeType = await this.recipeTypeRepository.update(
            entity.uuid,
            updateInput,
        );
        if (!updated) throw new BadRequestException();

        await this.emitUpdateEventBase(entity, existed, updated);

        return updated;
    }

    public updateQueryBase(entity: RecipeTypeEntity): RecipeTypeUpdateInput {
        return {
            title: entity.title,
            description: entity.description,
        };
    }

    public createEntityBase(props: RecipeTypeUpdate.Request): RecipeTypeEntity {
        return new RecipeTypeEntity(props);
    }

    public async isExistBase(uuid: string): Promise<RecipeType | null> {
        const findOneUuidInput: RecipeTypeWhereUniqueInput = { uuid };
        return await this.recipeTypeRepository.findOneUuid(findOneUuidInput);
    }

    public async emitUpdateEventBase(
        entity: RecipeTypeEntity,
        existed: RecipeType,
        updated: RecipeType,
    ): Promise<void> {
        entity.updateEvent(existed, updated);
        await this.handle(entity);
    }
}
