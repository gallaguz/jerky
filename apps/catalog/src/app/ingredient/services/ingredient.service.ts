import { Injectable } from '@nestjs/common';
import {
    IngredientCreate,
    IngredientFindFiltered,
    IngredientFindOneTitle,
    IngredientFindOneUuid,
    IngredientRemove,
    IngredientUpdate,
} from '@jerky/contracts';
import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { IngredientCreateService } from './ingredient.create.service';
import { IngredientUpdateService } from './ingredient.update.service';
import { IngredientRemoveService } from './ingredient.remove.service';
import { IngredientFindService } from './ingredient.find.service';
import { IBaseService } from '../../common';
import { IngredientConnectionsCommandContract } from '@jerky/contracts';
import { IngredientConnectionService } from './ingredient.connection.service';

@Injectable()
export class IngredientService
    implements
        IBaseService<
            Ingredient,
            IngredientCreate.Request,
            IngredientFindFiltered.Request,
            IngredientFindOneUuid.Request,
            IngredientFindOneTitle.Request,
            IngredientUpdate.Request,
            IngredientRemove.Request,
            IngredientConnectionsCommandContract.Request
        >
{
    constructor(
        private readonly ingredientCreateService: IngredientCreateService,
        private readonly ingredientUpdateService: IngredientUpdateService,
        private readonly ingredientRemoveService: IngredientRemoveService,
        private readonly ingredientFindService: IngredientFindService,
        private readonly ingredientConnectionService: IngredientConnectionService,
    ) {}

    public async create(props: IngredientCreate.Request): Promise<Ingredient> {
        return await this.ingredientCreateService.create(props);
    }

    public async findFiltered(
        props: IngredientFindFiltered.Request,
    ): Promise<Ingredient[]> {
        return await this.ingredientFindService.findFiltered(props);
    }

    public async findOneUuid(
        props: IngredientFindOneUuid.Request,
    ): Promise<Ingredient> {
        return await this.ingredientFindService.findOneUuid(props);
    }

    public async findOneTitle(
        props: IngredientFindOneTitle.Request,
    ): Promise<Ingredient> {
        return await this.ingredientFindService.findOneTitle(props);
    }

    public async update(props: IngredientUpdate.Request): Promise<Ingredient> {
        return await this.ingredientUpdateService.update(props);
    }

    public async remove(props: IngredientRemove.Request): Promise<Ingredient> {
        return await this.ingredientRemoveService.remove(props);
    }

    public async updateConnection(
        props: IngredientConnectionsCommandContract.Request,
    ): Promise<Ingredient> {
        return this.ingredientConnectionService.updateConnection(props);
    }
}
