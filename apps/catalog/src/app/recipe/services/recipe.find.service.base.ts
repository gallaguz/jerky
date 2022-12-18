import { BaseService, IFindServiceBase } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderBy } from '@jerky/enums';
import { RecipeRepository } from '../recipe.repository';
import { Prisma, Recipe } from '@prisma/client/scripts/catalog-client';
import RecipeWhereInput = Prisma.RecipeWhereInput;
import RecipeWhereUniqueInput = Prisma.RecipeWhereUniqueInput;
import {
    RecipeFindFiltered,
    RecipeFindOneTitle,
    RecipeFindOneUuid,
} from '@jerky/contracts';
import RecipeOrderByWithRelationInput = Prisma.RecipeOrderByWithRelationInput;
import RecipeFindManyArgs = Prisma.RecipeFindManyArgs;

@Injectable()
export abstract class RecipeFindServiceBase
    extends BaseService
    implements
        IFindServiceBase<
            Recipe,
            RecipeFindFiltered.Request,
            RecipeFindManyArgs,
            RecipeFindOneUuid.Request,
            RecipeWhereUniqueInput,
            RecipeFindOneTitle.Request,
            RecipeWhereInput
        >
{
    protected constructor(
        private readonly recipeRepository: RecipeRepository,
        private readonly configService: ConfigService,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async findFilteredBase(
        props: RecipeFindFiltered.Request,
    ): Promise<Recipe[]> {
        const findFilteredInput: RecipeFindManyArgs =
            this.findFilteredQueryBase(props);
        return await this.recipeRepository.findFiltered(findFilteredInput);
    }

    public async findOneUuidBase(
        props: RecipeFindOneUuid.Request,
    ): Promise<Recipe> {
        const findOneUuidInput: RecipeWhereUniqueInput =
            this.findOneUuidQueryBase(props);
        const existed = await this.recipeRepository.findOneUuid(
            findOneUuidInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findOneTitleBase(
        props: RecipeFindOneTitle.Request,
    ): Promise<Recipe> {
        const findOneTitleInput: RecipeWhereInput =
            this.findOneTitleQueryBase(props);
        const existed = await this.recipeRepository.findOneTitle(
            findOneTitleInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    findFilteredQueryBase(
        props: RecipeFindFiltered.Request,
    ): RecipeFindManyArgs {
        return {
            where: this.or(props.searchString),
            take: this.take(props.take),
            skip: this.skip(props.skip),
            orderBy: this.orderBy(props.orderBy),
        };
    }

    findOneUuidQueryBase(
        props: RecipeFindOneUuid.Request,
    ): RecipeWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    findOneTitleQueryBase(props: RecipeFindOneTitle.Request): RecipeWhereInput {
        return {
            title: props.title,
        };
    }

    public or(searchString?: string): RecipeWhereInput {
        return searchString
            ? {
                  OR: [
                      { title: { contains: searchString } },
                      { description: { contains: searchString } },
                  ],
              }
            : {};
    }

    public take(take?: number): number {
        return Number(take) || Number(this.configService.get('TAKE_DEFAULT'));
    }

    public skip(skip?: number): number | undefined {
        return Number(skip) || undefined;
    }

    public orderBy(orderBy?: OrderBy): RecipeOrderByWithRelationInput {
        return {
            title: orderBy || this.configService.get('ORDER_BY_DEFAULT'),
        };
    }
}
