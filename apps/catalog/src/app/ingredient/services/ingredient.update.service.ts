import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { IngredientUpdate } from '@jerky/contracts';
import { IngredientRepository } from '../ingredient.repository';
import { IUpdateService } from '../../common';
import { IngredientUpdateServiceBase } from './base/ingredient.update.service.base';

@Injectable()
export class IngredientUpdateService
    extends IngredientUpdateServiceBase
    implements IUpdateService<IngredientUpdate.Request, Ingredient>
{
    constructor(
        ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(ingredientRepository, rmqService);
    }

    public async update(props: IngredientUpdate.Request): Promise<Ingredient> {
        return await this.updateBase(props);
    }
}
