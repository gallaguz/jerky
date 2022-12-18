import { Ingredient } from '@prisma/client/scripts/catalog-client';

import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { IngredientRemove } from '@jerky/contracts';
import { IngredientRepository } from '../ingredient.repository';
import { IngredientRemoveServiceBase } from './base/ingredient.remove.service.base';
import { IRemoveService } from '../../common';

@Injectable()
export class IngredientRemoveService
    extends IngredientRemoveServiceBase
    implements IRemoveService<IngredientRemove.Request, Ingredient>
{
    constructor(
        ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(ingredientRepository, rmqService);
    }

    public async remove(props: IngredientRemove.Request): Promise<Ingredient> {
        return await this.removeBase(props);
    }
}
