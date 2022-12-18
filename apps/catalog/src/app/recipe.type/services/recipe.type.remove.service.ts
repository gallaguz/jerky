import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { Injectable } from '@nestjs/common';
import { IRemoveService } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { RecipeTypeRemove } from '@jerky/contracts';
import { RecipeTypeRepository } from '../recipe.type.repository';
import { RecipeTypeRemoveServiceBase } from './recipe.type.remove.service.base';

@Injectable()
export class RecipeTypeRemoveService
    extends RecipeTypeRemoveServiceBase
    implements IRemoveService<RecipeTypeRemove.Request, RecipeType>
{
    constructor(
        recipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
    ) {
        super(recipeTypeRepository, rmqService);
    }

    public async remove(props: RecipeTypeRemove.Request): Promise<RecipeType> {
        return await this.removeBase(props);
    }
}
