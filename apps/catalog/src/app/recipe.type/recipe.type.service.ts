import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BaseService, IBaseService } from '../common/base.service';
import { RecipeTypeEntity } from './recipe.type.entity';
import { RecipeTypeRepository } from './recipe.type.repository';
import { RMQService } from 'nestjs-rmq';
import {
    FindFiltered,
    RecipeTypeCreate,
    RecipeTypeFindFiltered,
    RecipeTypeFindOne,
    RecipeTypeRemove,
    RecipeTypeUpdate,
} from '@jerky/contracts';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { IRecipeTypeEntity, IRecipeTypeProps } from '@jerky/interfaces';

@Injectable()
export class RecipeTypeService
    extends BaseService
    implements IBaseService<IRecipeTypeEntity>
{
    constructor(
        private readonly recipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async create(
        props: RecipeTypeCreate.Request,
    ): Promise<IRecipeTypeEntity> {
        const existed: RecipeType[] =
            await this.recipeTypeRepository.findFiltered({
                searchString: props.title,
            });
        if (existed.length) throw new ConflictException();

        return await this.handleCreate(<IRecipeTypeProps>props);
    }

    private async handleCreate(
        props: IRecipeTypeProps,
    ): Promise<IRecipeTypeEntity> {
        const entity: RecipeTypeEntity = new RecipeTypeEntity(undefined, props);

        const created: RecipeType = await this.recipeTypeRepository.create(
            <RecipeTypeEntity>entity,
        );
        if (!created) throw new BadRequestException();

        entity.createEvent(<IRecipeTypeProps>props);
        await this.handle(<RecipeTypeEntity>entity);

        const { uuid, ...rest } = created;
        return new RecipeTypeEntity(<string>uuid, <IRecipeTypeProps>rest);
    }

    public async findFiltered(
        props: RecipeTypeFindFiltered.Request,
    ): Promise<IRecipeTypeEntity[]> {
        const existed: RecipeType[] =
            await this.recipeTypeRepository.findFiltered(<FindFiltered>props);

        return await this.handleFindFiltered(<RecipeType[]>existed);
    }

    private async handleFindFiltered(
        existed: RecipeType[],
    ): Promise<IRecipeTypeEntity[]> {
        return existed.map(
            ({ uuid, ...rest }) =>
                new RecipeTypeEntity(<string>uuid, <IRecipeTypeProps>rest),
        );
    }

    public async findOne(
        props: RecipeTypeFindOne.Request,
    ): Promise<IRecipeTypeEntity> {
        const existed: RecipeType | null =
            await this.recipeTypeRepository.findOne(<string>props.uuid);
        if (!existed) throw new NotFoundException();

        const { uuid, ...rest } = existed;
        return new RecipeTypeEntity(uuid, rest);
    }

    public async update(
        props: RecipeTypeUpdate.Request,
    ): Promise<IRecipeTypeEntity> {
        const existed: RecipeType | null =
            await this.recipeTypeRepository.findOne(<string>props.uuid);
        if (!existed) throw new NotFoundException();

        return await this.handleUpdate(existed, props);
    }

    private async handleUpdate(
        existed: RecipeType,
        props: IRecipeTypeProps,
    ): Promise<IRecipeTypeEntity> {
        const entity: RecipeTypeEntity = new RecipeTypeEntity(
            <string>existed.uuid,
        );
        entity.update(props);

        const { uuid, ...rest } = await this.recipeTypeRepository.update(
            <RecipeTypeEntity>entity,
        );

        entity.updateEvent(<IRecipeTypeProps>props);
        await this.handle(<RecipeTypeEntity>entity);

        return new RecipeTypeEntity(<string>uuid, <IRecipeTypeProps>rest);
    }

    public async remove(
        props: RecipeTypeRemove.Request,
    ): Promise<IRecipeTypeEntity> {
        const deleted = await this.recipeTypeRepository.remove(props.uuid);
        if (!deleted) throw new NotFoundException();

        return await this.handleRemove(deleted);
    }

    private async handleRemove(
        deleted: RecipeType,
    ): Promise<IRecipeTypeEntity> {
        const { uuid, ...rest } = deleted;
        const entity = new RecipeTypeEntity(uuid, rest);

        entity.removeEvent();
        await this.handle(entity);

        return entity;
    }
}
