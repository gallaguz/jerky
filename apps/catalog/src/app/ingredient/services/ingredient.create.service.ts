import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { IngredientCreate } from '@jerky/contracts';
import { IngredientRepository } from '../ingredient.repository';
import { IngredientCreateServiceBase } from './base/ingredient.create.service.base';

@Injectable()
export class IngredientCreateService extends IngredientCreateServiceBase {
    constructor(
        ingredientRepository: IngredientRepository,
        rmqService: RMQService,
    ) {
        super(ingredientRepository, rmqService);
    }

    public async create(props: IngredientCreate.Request): Promise<Ingredient> {
        return await this.createBase(props);
    }
}
