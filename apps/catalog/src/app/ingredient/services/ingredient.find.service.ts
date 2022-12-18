import {
    IngredientFindFiltered,
    IngredientFindOneTitle,
    IngredientFindOneUuid,
} from '@jerky/contracts';
import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { IFindService } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { Injectable } from '@nestjs/common';
import { IngredientRepository } from '../ingredient.repository';
import { IngredientFindServiceBase } from './base/ingredient.find.service.base';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IngredientFindService
    extends IngredientFindServiceBase
    implements
        IFindService<
            Ingredient,
            IngredientFindFiltered.Request,
            IngredientFindOneUuid.Request,
            IngredientFindOneTitle.Request
        >
{
    constructor(
        ingredientRepository: IngredientRepository,
        rmqService: RMQService,
        configService: ConfigService,
    ) {
        super(ingredientRepository, configService, rmqService);
    }

    public async findFiltered(
        props: IngredientFindFiltered.Request,
    ): Promise<Ingredient[]> {
        return await this.findFilteredBase(props);
    }

    public async findOneUuid(
        props: IngredientFindOneUuid.Request,
    ): Promise<Ingredient> {
        return await this.findOneUuidBase(props);
    }

    public async findOneTitle(
        props: IngredientFindOneTitle.Request,
    ): Promise<Ingredient> {
        return await this.findOneTitleBase(props);
    }
}
