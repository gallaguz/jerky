import { IFindService } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RecipeFindServiceBase } from './recipe.find.service.base';
import { RecipeRepository } from '../recipe.repository';
import { Recipe } from '@prisma/client/scripts/catalog-client';
import {
    RecipeFindFiltered,
    RecipeFindOneTitle,
    RecipeFindOneUuid,
} from '@jerky/contracts';

@Injectable()
export class RecipeFindService
    extends RecipeFindServiceBase
    implements
        IFindService<
            Recipe,
            RecipeFindFiltered.Request,
            RecipeFindOneUuid.Request,
            RecipeFindOneTitle.Request
        >
{
    constructor(
        recipeRepository: RecipeRepository,
        rmqService: RMQService,
        configService: ConfigService,
    ) {
        super(recipeRepository, configService, rmqService);
    }

    public async findFiltered(
        props: RecipeFindFiltered.Request,
    ): Promise<Recipe[]> {
        return await this.findFilteredBase(props);
    }

    public async findOneUuid(
        props: RecipeFindOneUuid.Request,
    ): Promise<Recipe> {
        return await this.findOneUuidBase(props);
    }

    public async findOneTitle(
        props: RecipeFindOneTitle.Request,
    ): Promise<Recipe> {
        return await this.findOneTitleBase(props);
    }
}
