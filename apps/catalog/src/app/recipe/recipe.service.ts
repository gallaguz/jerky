import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BaseService, IBaseService } from '../common/base.service';
import { Recipe, RecipeType } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { RecipeRepository } from './recipe.repository';
import {
    FindFiltered,
    RecipeCreate,
    RecipeFindFiltered,
    RecipeFindOne,
    RecipeRemove,
    RecipeUpdate,
} from '@jerky/contracts';
import { IRecipeEntity, IRecipeProps } from '@jerky/interfaces';
import { RecipeEntity } from './recipe.entity';

@Injectable()
export class RecipeService
    extends BaseService
    implements IBaseService<IRecipeEntity>
{
    constructor(
        private readonly recipeRepository: RecipeRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async create(props: RecipeCreate.Request): Promise<IRecipeEntity> {
        const existed: Recipe[] = await this.recipeRepository.findFiltered({
            searchString: props.title,
        });
        if (existed.length) throw new ConflictException();

        return await this.handleCreate(<IRecipeProps>props);
    }

    private async handleCreate(props: IRecipeProps): Promise<IRecipeEntity> {
        const entity: RecipeEntity = new RecipeEntity(undefined, props);

        const created: Recipe = await this.recipeRepository.create(
            <RecipeEntity>entity,
        );
        if (!created) throw new BadRequestException();

        entity.createEvent(<IRecipeProps>props);
        await this.handle(<RecipeEntity>entity);

        const { uuid, ...rest } = created;
        return new RecipeEntity(<string>uuid, <IRecipeProps>rest);
    }

    public async findFiltered(
        props: RecipeFindFiltered.Request,
    ): Promise<IRecipeEntity[]> {
        const existed: Recipe[] = await this.recipeRepository.findFiltered(
            <FindFiltered>props,
        );

        return await this.handleFindFiltered(<Recipe[]>existed);
    }

    private async handleFindFiltered(
        existed: Recipe[],
    ): Promise<IRecipeEntity[]> {
        return existed.map(
            ({ uuid, ...rest }) =>
                new RecipeEntity(<string>uuid, <IRecipeProps>rest),
        );
    }

    public async findOne(props: RecipeFindOne.Request): Promise<IRecipeEntity> {
        const existed: Recipe | null = await this.recipeRepository.findOne(
            <string>props.uuid,
        );
        if (!existed) throw new NotFoundException();

        const { uuid, ...rest } = existed;
        return new RecipeEntity(uuid, rest);
    }

    public async update(props: RecipeUpdate.Request): Promise<IRecipeEntity> {
        const existed: Recipe | null = await this.recipeRepository.findOne(
            <string>props.uuid,
        );
        if (!existed) throw new NotFoundException();

        return await this.handleUpdate(existed, props);
    }

    private async handleUpdate(
        existed: Recipe,
        props: IRecipeProps,
    ): Promise<IRecipeEntity> {
        const entity: RecipeEntity = new RecipeEntity(<string>existed.uuid);
        entity.update(props);

        const { uuid, ...rest } = await this.recipeRepository.update(
            <RecipeEntity>entity,
        );

        entity.updateEvent(<IRecipeProps>props);
        await this.handle(<RecipeEntity>entity);

        return new RecipeEntity(<string>uuid, <IRecipeProps>rest);
    }

    public async remove(props: RecipeRemove.Request): Promise<IRecipeEntity> {
        const deleted: Recipe = await this.recipeRepository.remove(
            <string>props.uuid,
        );
        if (!deleted) throw new NotFoundException();

        return await this.handleRemove(<Recipe>deleted);
    }

    private async handleRemove(deleted: Recipe): Promise<IRecipeEntity> {
        const { uuid, ...rest } = deleted;
        const entity: RecipeEntity = new RecipeEntity(
            <string>uuid,
            <IRecipeProps>rest,
        );

        entity.removeEvent();
        await this.handle(<RecipeEntity>entity);

        return entity;
    }
}
