import { Injectable } from '@nestjs/common';
import {
    RecipeTypeCreate,
    RecipeTypeFindFiltered,
    RecipeTypeFindOneTitle,
    RecipeTypeFindOneUuid,
    RecipeTypeRemove,
    RecipeTypeUpdate,
} from '@jerky/contracts';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { IBaseService } from '../../common';
import { RecipeTypeCreateService } from './recipe.type.create.service';
import { RecipeTypeFindService } from './recipe.type.find.service';
import { RecipeTypeRemoveService } from './recipe.type.remove.service';
import { RecipeTypeUpdateService } from './recipe.type.update.service';

@Injectable()
export class RecipeTypeService
    implements
        IBaseService<
            RecipeType,
            RecipeTypeCreate.Request,
            RecipeTypeFindFiltered.Request,
            RecipeTypeFindOneUuid.Request,
            RecipeTypeFindOneTitle.Request,
            RecipeTypeUpdate.Request,
            RecipeTypeRemove.Request
        >
{
    constructor(
        private readonly recipeTypeCreateService: RecipeTypeCreateService,
        private readonly recipeTypeUpdateService: RecipeTypeUpdateService,
        private readonly recipeTypeFindService: RecipeTypeFindService,
        private readonly recipeTypeRemoveService: RecipeTypeRemoveService,
    ) {}

    public async create(props: RecipeTypeCreate.Request): Promise<RecipeType> {
        return await this.recipeTypeCreateService.create(props);
    }

    public async findFiltered(
        props: RecipeTypeFindFiltered.Request,
    ): Promise<RecipeType[]> {
        return await this.recipeTypeFindService.findFiltered(props);
    }

    public async findOneUuid(
        props: RecipeTypeFindOneUuid.Request,
    ): Promise<RecipeType> {
        return await this.recipeTypeFindService.findOneUuid(props);
    }

    public async findOneTitle(
        props: RecipeTypeFindOneTitle.Request,
    ): Promise<RecipeType> {
        return await this.recipeTypeFindService.findOneTitle(props);
    }

    public async update(props: RecipeTypeUpdate.Request): Promise<RecipeType> {
        return await this.recipeTypeUpdateService.update(props);
    }

    public async remove(props: RecipeTypeRemove.Request): Promise<RecipeType> {
        return this.recipeTypeRemoveService.remove(props);
    }
}
