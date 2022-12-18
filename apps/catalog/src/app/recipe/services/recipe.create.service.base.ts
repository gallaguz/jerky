import { BaseService, ICreateServiceBase } from '../../common';
import { RecipeCreate } from '@jerky/contracts';
import { Prisma, Recipe } from '@prisma/client/scripts/catalog-client';
import { RecipeEntity } from '../recipe.entity';
import { RecipeRepository } from '../recipe.repository';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, ConflictException } from '@nestjs/common';
import RecipeCreateInput = Prisma.RecipeCreateInput;
import { IRecipeCreate } from '@jerky/interfaces';
import RecipeWhereInput = Prisma.RecipeWhereInput;

export abstract class RecipeCreateServiceBase
    extends BaseService
    implements
        ICreateServiceBase<
            RecipeCreate.Request,
            Recipe,
            RecipeEntity,
            RecipeCreateInput,
            string
        >
{
    protected constructor(
        private readonly recipeRepository: RecipeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async createBase(props: RecipeCreate.Request): Promise<Recipe> {
        const existed: Recipe | null = await this.isExistBase(props.title);
        if (existed) throw new ConflictException();

        const entity: RecipeEntity = this.createEntityBase(props);
        const createInput: RecipeCreateInput = this.createQueryBase(entity);
        const created: Recipe = await this.recipeRepository.create(createInput);
        if (!created) throw new BadRequestException();

        await this.emitCreateEventBase(entity, created);

        return created;
    }

    public createQueryBase(entity: RecipeEntity): RecipeCreateInput {
        return {
            uuid: entity.uuid,
            title: entity.title,
            description: entity.description,
            category: { connect: { uuid: entity.categoryUuid } },
            raw: { connect: { uuid: entity.rawUuid } },
            recipeType: { connect: { uuid: entity.recipeTypeUuid } },
        };
    }

    public createEntityBase(props: RecipeCreate.Request): RecipeEntity {
        const entityProps: IRecipeCreate = {
            uuid: this.uuid(),
            title: props.title,
            description: props.description,
            rawUuid: props.rawUuid,
            categoryUuid: props.categoryUuid,
            recipeTypeUuid: props.recipeTypeUuid,
        };
        return new RecipeEntity(entityProps);
    }

    public async isExistBase(title: string): Promise<Recipe | null> {
        const findOneTitleInput: RecipeWhereInput = { title };
        return await this.recipeRepository.findOneTitle(findOneTitleInput);
    }

    public async emitCreateEventBase(
        entity: RecipeEntity,
        created: Recipe,
    ): Promise<void> {
        entity.createEvent(created);
        await this.handle(entity);
    }
}
