import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientUpdateService } from './ingredient.update.service';
import { IConnectionService } from '../../common';
import { IngredientConnectionsCommandContract } from '@jerky/contracts';
import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';
import IngredientUpdateInput = Prisma.IngredientUpdateInput;
import { IngredientRepository } from '../ingredient.repository';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class IngredientConnectionService
    extends IngredientUpdateService
    implements
        IConnectionService<
            IngredientConnectionsCommandContract.Request,
            Ingredient,
            IngredientUpdateInput
        >
{
    constructor(
        ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(ingredientRepository, rmqService);
    }

    public async updateConnection(
        props: IngredientConnectionsCommandContract.Request,
    ): Promise<Ingredient> {
        const existed: Ingredient | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const connectionInput: IngredientUpdateInput =
            this.updateConnectionQuery(props);
        return await this.ingredientRepository.update(
            props.uuid,
            connectionInput,
        );
    }

    public updateConnectionQuery(
        props: IngredientConnectionsCommandContract.Request,
    ): IngredientUpdateInput {
        return {
            [props.model]: {
                [props.action]: {
                    uuid: props.targetUuid,
                },
            },
        };
    }
}
