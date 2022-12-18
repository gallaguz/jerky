import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { IngredientUpdate } from '@jerky/contracts';
import { IngredientRepository } from '../../ingredient.repository';
import { IngredientEntity } from '../../ingredient.entity';
import { BaseService, IUpdateServiceBase } from '../../../common';
import IngredientUpdateInput = Prisma.IngredientUpdateInput;
import IngredientWhereUniqueInput = Prisma.IngredientWhereUniqueInput;

@Injectable()
export abstract class IngredientUpdateServiceBase
    extends BaseService
    implements
        IUpdateServiceBase<
            IngredientUpdate.Request,
            Ingredient,
            IngredientEntity,
            IngredientUpdateInput,
            string
        >
{
    protected constructor(
        protected readonly ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async updateBase(
        props: IngredientUpdate.Request,
    ): Promise<Ingredient> {
        const existed: Ingredient | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const entity: IngredientEntity = this.createEntityBase(props);
        entity.update(props);

        const updateInput: IngredientUpdateInput = this.updateQueryBase(entity);
        const updated: Ingredient = await this.ingredientRepository.update(
            entity.uuid,
            updateInput,
        );
        if (!updated) throw new BadRequestException();

        await this.emitUpdateEventBase(entity, existed, updated);

        return updated;
    }

    public updateQueryBase(entity: IngredientEntity): IngredientUpdateInput {
        // let connection;
        // if (entity.ingredientQtyConnection) {
        //     connection = {
        //         [entity.ingredientQtyConnection.model]: {
        //             [entity.ingredientQtyConnection.action]:
        //                 entity.ingredientQtyConnection.data,
        //         },
        //     };
        // }
        return {
            title: entity.title,
            description: entity.description,
            price: entity.price,
            form: entity.form,
            // ...connection,
        };
    }

    public createEntityBase(props: IngredientUpdate.Request): IngredientEntity {
        return new IngredientEntity(props);
    }

    public createEntityFromModelBase(model: Ingredient): IngredientEntity {
        return new IngredientEntity(model);
    }

    public async isExistBase(uuid: string): Promise<Ingredient | null> {
        const findOneUuidInput: IngredientWhereUniqueInput = { uuid };
        return await this.ingredientRepository.findOneUuid(findOneUuidInput);
    }

    public async emitUpdateEventBase(
        entity: IngredientEntity,
        existed: Ingredient,
        updated: Ingredient,
    ): Promise<void> {
        entity.updateEvent(existed, updated);
        await this.handle(entity);
    }
}
