import { Injectable } from '@nestjs/common';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { RecipeTypeUpdate } from '@jerky/contracts';
import { IUpdateService } from '../../common';
import { RecipeTypeUpdateServiceBase } from './recipe.type.update.service.base';
import { RecipeTypeRepository } from '../recipe.type.repository';

@Injectable()
export class RecipeTypeUpdateService
    extends RecipeTypeUpdateServiceBase
    implements IUpdateService<RecipeTypeUpdate.Request, RecipeType>
{
    constructor(
        recipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
    ) {
        super(recipeTypeRepository, rmqService);
    }

    public async update(props: RecipeTypeUpdate.Request): Promise<RecipeType> {
        return await this.updateBase(props);
    }
}
