import { Injectable } from '@nestjs/common';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { RecipeTypeCreate } from '@jerky/contracts';
import { ICreateService } from '../../common';
import { RecipeTypeCreateServiceBase } from './recipe.type.create.service.base';
import { RecipeTypeRepository } from '../recipe.type.repository';

@Injectable()
export class RecipeTypeCreateService
    extends RecipeTypeCreateServiceBase
    implements ICreateService<RecipeTypeCreate.Request, RecipeType>
{
    constructor(
        recipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
    ) {
        super(recipeTypeRepository, rmqService);
    }

    public async create(props: RecipeTypeCreate.Request): Promise<RecipeType> {
        return await this.createBase(props);
    }
}
