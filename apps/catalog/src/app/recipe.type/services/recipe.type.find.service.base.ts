import { BaseService, IFindServiceBase } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBy } from '@jerky/enums';
import { ConfigService } from '@nestjs/config';
import { Prisma, RecipeType } from '@prisma/client/scripts/catalog-client';
import RecipeTypeOrderByWithRelationInput = Prisma.RecipeTypeOrderByWithRelationInput;
import RecipeTypeFindManyArgs = Prisma.RecipeTypeFindManyArgs;
import { RecipeTypeRepository } from '../recipe.type.repository';
import CategoryWhereUniqueInput = Prisma.CategoryWhereUniqueInput;
import {
    RecipeTypeFindFiltered,
    RecipeTypeFindOneTitle,
    RecipeTypeFindOneUuid,
} from '@jerky/contracts';
import RecipeTypeWhereUniqueInput = Prisma.RecipeTypeWhereUniqueInput;
import RecipeTypeWhereInput = Prisma.RecipeTypeWhereInput;

@Injectable()
export abstract class RecipeTypeFindServiceBase
    extends BaseService
    implements
        IFindServiceBase<
            RecipeType,
            RecipeTypeFindFiltered.Request,
            RecipeTypeFindManyArgs,
            RecipeTypeFindOneUuid.Request,
            CategoryWhereUniqueInput,
            RecipeTypeFindOneTitle.Request,
            RecipeTypeWhereUniqueInput
        >
{
    protected constructor(
        private readonly recipeTypeRepository: RecipeTypeRepository,
        private readonly configService: ConfigService,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async findFilteredBase(
        props: RecipeTypeFindFiltered.Request,
    ): Promise<RecipeType[]> {
        const findFilteredInput: RecipeTypeFindManyArgs =
            this.findFilteredQueryBase(props);
        return await this.recipeTypeRepository.findFiltered(findFilteredInput);
    }

    public async findOneUuidBase(
        props: RecipeTypeFindOneUuid.Request,
    ): Promise<RecipeType> {
        const findOneUuidInput: RecipeTypeWhereUniqueInput =
            this.findOneUuidQueryBase(props);
        const existed = await this.recipeTypeRepository.findOneUuid(
            findOneUuidInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findOneTitleBase(
        props: RecipeTypeFindOneTitle.Request,
    ): Promise<RecipeType> {
        const findOneTitleInput: RecipeTypeWhereUniqueInput =
            this.findOneTitleQueryBase(props);
        const existed = await this.recipeTypeRepository.findOneTitle(
            findOneTitleInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public findFilteredQueryBase(
        props: RecipeTypeFindFiltered.Request,
    ): RecipeTypeFindManyArgs {
        return {
            where: this.or(props.searchString),
            take: this.take(props.take),
            skip: this.skip(props.skip),
            orderBy: this.orderBy(props.orderBy),
        };
    }
    public findOneUuidQueryBase(
        props: RecipeTypeFindOneUuid.Request,
    ): RecipeTypeWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }
    public findOneTitleQueryBase(
        props: RecipeTypeFindOneTitle.Request,
    ): RecipeTypeWhereUniqueInput {
        return {
            title: props.title,
        };
    }

    public or(searchString?: string): RecipeTypeWhereInput {
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

    public orderBy(orderBy?: OrderBy): RecipeTypeOrderByWithRelationInput {
        return {
            title: orderBy || this.configService.get('ORDER_BY_DEFAULT'),
        };
    }
}
