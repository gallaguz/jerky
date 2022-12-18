import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { IngredientCreate } from '@jerky/contracts';
import { IngredientRepository } from '../../ingredient.repository';
import { IngredientEntity } from '../../ingredient.entity';
import IngredientCreateInput = Prisma.IngredientCreateInput;
import { BaseService, ICreateServiceBase } from '../../../common';
import IngredientWhereInput = Prisma.IngredientWhereInput;
import { IIngredientCreate } from '@jerky/interfaces';

@Injectable()
export abstract class IngredientCreateServiceBase
    extends BaseService
    implements
        ICreateServiceBase<
            IngredientCreate.Request,
            Ingredient,
            IngredientEntity,
            IngredientCreateInput,
            string
        >
{
    protected constructor(
        private readonly ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async createBase(
        props: IngredientCreate.Request,
    ): Promise<Ingredient> {
        const existed: Ingredient | null = await this.isExistBase(props.title);
        if (existed) throw new ConflictException();

        const entity: IngredientEntity = this.createEntityBase(props);
        const createInput: IngredientCreateInput = this.createQueryBase(entity);

        const created: Ingredient = await this.ingredientRepository.create(
            createInput,
        );
        if (!created) throw new BadRequestException();

        await this.emitCreateEventBase(entity, created);

        return created;
    }

    public createQueryBase(entity: IngredientEntity): IngredientCreateInput {
        return {
            uuid: entity.uuid,
            title: entity.title,
            price: entity.price,
            description: entity.description,
        };
    }

    public createEntityBase(props: IngredientCreate.Request): IngredientEntity {
        const entityProps: IIngredientCreate = {
            uuid: this.uuid(),
            title: props.title,
            description: props.description,
            form: props.form,
            price: props.price,
        };
        return new IngredientEntity(entityProps);
    }

    public async isExistBase(title: string): Promise<Ingredient | null> {
        const findOneTitleInput: IngredientWhereInput = { title };
        return await this.ingredientRepository.findOneTitle(findOneTitleInput);
    }

    public async emitCreateEventBase(
        entity: IngredientEntity,
        created: Ingredient,
    ): Promise<void> {
        entity.createEvent(created);
        await this.handle(entity);
    }
}
