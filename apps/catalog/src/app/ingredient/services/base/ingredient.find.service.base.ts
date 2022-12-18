import {
    IngredientFindFiltered,
    IngredientFindOneTitle,
    IngredientFindOneUuid,
} from '@jerky/contracts';
import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';
import { BaseService, IFindServiceBase } from '../../../common';
import { RMQService } from 'nestjs-rmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from '../../ingredient.repository';
import IngredientFindManyArgs = Prisma.IngredientFindManyArgs;
import IngredientWhereUniqueInput = Prisma.IngredientWhereUniqueInput;
import IngredientWhereInput = Prisma.IngredientWhereInput;
import { ConfigService } from '@nestjs/config';
import { OrderBy } from '@jerky/enums';
import IngredientOrderByWithRelationInput = Prisma.IngredientOrderByWithRelationInput;

@Injectable()
export abstract class IngredientFindServiceBase
    extends BaseService
    implements
        IFindServiceBase<
            Ingredient,
            IngredientFindFiltered.Request,
            IngredientFindManyArgs,
            IngredientFindOneUuid.Request,
            IngredientWhereUniqueInput,
            IngredientFindOneTitle.Request,
            IngredientWhereInput
        >
{
    protected constructor(
        private readonly ingredientRepository: IngredientRepository,
        private readonly configService: ConfigService,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async findFilteredBase(
        props: IngredientFindFiltered.Request,
    ): Promise<Ingredient[]> {
        const findFilteredInput: IngredientFindManyArgs =
            this.findFilteredQueryBase(props);
        return await this.ingredientRepository.findFiltered(findFilteredInput);
    }

    public async findOneUuidBase(
        props: IngredientFindOneUuid.Request,
    ): Promise<Ingredient> {
        const findOneUuidInput: IngredientWhereUniqueInput =
            this.findOneUuidQueryBase(props);
        const existed = await this.ingredientRepository.findOneUuid(
            findOneUuidInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findOneTitleBase(
        props: IngredientFindOneTitle.Request,
    ): Promise<Ingredient> {
        const findOneTitleInput: IngredientWhereInput =
            this.findOneTitleQueryBase(props);
        const existed = await this.ingredientRepository.findOneTitle(
            findOneTitleInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    findFilteredQueryBase(
        props: IngredientFindFiltered.Request,
    ): IngredientFindManyArgs {
        return {
            where: this.or(props.searchString),
            take: this.take(props.take),
            skip: this.skip(props.skip),
            orderBy: this.orderBy(props.orderBy),
        };
    }

    findOneUuidQueryBase(
        props: IngredientFindOneUuid.Request,
    ): IngredientWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    findOneTitleQueryBase(
        props: IngredientFindOneTitle.Request,
    ): IngredientWhereInput {
        return {
            title: props.title,
        };
    }

    public or(searchString?: string): IngredientWhereInput {
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

    public orderBy(orderBy?: OrderBy): IngredientOrderByWithRelationInput {
        return {
            title: orderBy || this.configService.get('ORDER_BY_DEFAULT'),
        };
    }
}
