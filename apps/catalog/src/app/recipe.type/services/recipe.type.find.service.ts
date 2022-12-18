import { IFindService } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RecipeTypeFindServiceBase } from './recipe.type.find.service.base';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { RecipeTypeRepository } from '../recipe.type.repository';
import {
    RecipeTypeFindFiltered,
    RecipeTypeFindOneTitle,
    RecipeTypeFindOneUuid,
} from '@jerky/contracts';

@Injectable()
export class RecipeTypeFindService
    extends RecipeTypeFindServiceBase
    implements
        IFindService<
            RecipeType,
            RecipeTypeFindFiltered.Request,
            RecipeTypeFindOneUuid.Request,
            RecipeTypeFindOneTitle.Request
        >
{
    constructor(
        RecipeTypeRepository: RecipeTypeRepository,
        rmqService: RMQService,
        configService: ConfigService,
    ) {
        super(RecipeTypeRepository, configService, rmqService);
    }

    public async findFiltered(
        props: RecipeTypeFindFiltered.Request,
    ): Promise<RecipeType[]> {
        return await this.findFilteredBase(props);
    }

    public async findOneTitle(
        props: RecipeTypeFindOneTitle.Request,
    ): Promise<RecipeType> {
        return await this.findOneTitleBase(props);
    }

    public async findOneUuid(
        props: RecipeTypeFindOneUuid.Request,
    ): Promise<RecipeType> {
        return await this.findOneUuidBase(props);
    }
}
