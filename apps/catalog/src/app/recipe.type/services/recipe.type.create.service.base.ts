import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Prisma, RecipeType } from '@prisma/client/scripts/catalog-client';
import { BaseService, ICreateServiceBase } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { RecipeTypeCreate } from '@jerky/contracts';
import { RecipeTypeEntity } from '../recipe.type.entity';
import RecipeTypeCreateInput = Prisma.RecipeTypeCreateInput;
import { RecipeTypeRepository } from '../recipe.type.repository';
import { IRecipeTypeCreate } from '@jerky/interfaces';
import RecipeTypeWhereUniqueInput = Prisma.RecipeTypeWhereUniqueInput;

@Injectable()
export abstract class RecipeTypeCreateServiceBase
    extends BaseService
    implements
        ICreateServiceBase<
            RecipeTypeCreate.Request,
            RecipeType,
            RecipeTypeEntity,
            RecipeTypeCreateInput,
            string
        >
{
    protected constructor(
        private readonly recipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async createBase(
        props: RecipeTypeCreate.Request,
    ): Promise<RecipeType> {
        const existed: RecipeType | null = await this.isExistBase(props.title);
        if (existed) throw new ConflictException();

        const entity: RecipeTypeEntity = this.createEntityBase(props);

        const createInput: RecipeTypeCreateInput = this.createQueryBase(entity);

        const created = await this.recipeTypeRepository.create(createInput);
        if (!created) throw new BadRequestException();

        await this.emitCreateEventBase(entity, created);

        return created;
    }

    public createQueryBase(entity: RecipeTypeEntity): RecipeTypeCreateInput {
        return {
            uuid: entity.uuid,
            title: entity.title,
            description: entity.description,
        };
    }

    public createEntityBase(props: RecipeTypeCreate.Request): RecipeTypeEntity {
        const entityProps: IRecipeTypeCreate = {
            uuid: this.uuid(),
            title: props.title,
            description: props.description,
        };
        return new RecipeTypeEntity(entityProps);
    }

    public async isExistBase(title: string): Promise<RecipeType | null> {
        const findOneTitleInput: RecipeTypeWhereUniqueInput = { title };
        return await this.recipeTypeRepository.findOneTitle(findOneTitleInput);
    }

    public async emitCreateEventBase(
        entity: RecipeTypeEntity,
        created: RecipeType,
    ): Promise<void> {
        entity.createEvent(created);
        await this.handle(entity);
    }
}
