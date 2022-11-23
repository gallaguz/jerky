import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { IngredientEntity } from './ingredient.entity';
import {
    IngredientCreate,
    IngredientFindFiltered,
    IngredientFindOne,
    IngredientRemove,
    IngredientUpdate,
} from '@jerky/contracts';
import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { BaseService, IBaseService } from '../common/base.service';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class IngredientService
    extends BaseService
    implements IBaseService<IngredientEntity>
{
    constructor(
        private readonly ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async create(
        props: IngredientCreate.Request,
    ): Promise<IngredientEntity> {
        const ingredientEntity = new IngredientEntity(undefined, props);

        const createdIngredient = await this.ingredientRepository.create(
            ingredientEntity,
        );
        if (!createdIngredient) throw new BadRequestException();

        ingredientEntity.createEvent(props);
        await this.handle(ingredientEntity);

        const { uuid, ...rest } = createdIngredient;
        return new IngredientEntity(uuid, rest);
    }

    public async findFiltered(
        props: IngredientFindFiltered.Request,
    ): Promise<IngredientEntity[]> {
        const existedIngredients: Ingredient[] =
            await this.ingredientRepository.findFiltered(props);

        if (!existedIngredients.length) throw new NotFoundException();

        return existedIngredients.map(
            ({ uuid, ...rest }) => new IngredientEntity(uuid, rest),
        );
    }

    public async findOne(
        props: IngredientFindOne.Request,
    ): Promise<IngredientEntity> {
        const existedIngredient = await this.ingredientRepository.findOne(
            props.uuid,
        );
        if (!existedIngredient) throw new NotFoundException();
        const { uuid, ...rest } = existedIngredient;
        return new IngredientEntity(uuid, rest);
    }

    public async update(
        props: IngredientUpdate.Request,
    ): Promise<IngredientEntity> {
        const existedIngredient = await this.ingredientRepository.findOne(
            props.uuid,
        );
        if (!existedIngredient) throw new NotFoundException();

        const ingredientEntity = new IngredientEntity(existedIngredient.uuid);
        ingredientEntity.update(props);

        const { uuid, ...rest } = await this.ingredientRepository.update(
            ingredientEntity,
        );

        ingredientEntity.updateEvent(props);
        await this.handle(ingredientEntity);

        return new IngredientEntity(uuid, rest);
    }

    public async remove(
        props: IngredientRemove.Request,
    ): Promise<IngredientEntity> {
        const deletedIngredient = await this.ingredientRepository.remove(
            props.uuid,
        );
        if (!deletedIngredient) throw new NotFoundException();
        const { uuid, ...rest } = deletedIngredient;
        const ingredientEntity = new IngredientEntity(uuid, rest);

        ingredientEntity.removeEvent();
        await this.handle(ingredientEntity);

        return ingredientEntity;
    }
}
