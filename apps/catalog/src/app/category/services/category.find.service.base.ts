import {
    CategoryFindFilteredQueryContract,
    CategoryFindOneTitleQueryContract,
    CategoryFindOneUuidQueryContract,
} from '@jerky/contracts';
import { Category, Prisma } from '@prisma/client/scripts/catalog-client';
import { BaseService, IFindServiceBase } from '../../common';
import { CategoryRepository } from '../category.repository';
import { RMQService } from 'nestjs-rmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import CategoryFindManyArgs = Prisma.CategoryFindManyArgs;
import { OrderBy } from '@jerky/enums';
import { ConfigService } from '@nestjs/config';
import CategoryOrderByWithRelationInput = Prisma.CategoryOrderByWithRelationInput;
import CategoryWhereInput = Prisma.CategoryWhereInput;
import { ICategoryFindOneTitle, ICategoryFindOneUuid } from '@jerky/interfaces';

@Injectable()
export abstract class CategoryFindServiceBase
    extends BaseService
    implements
        IFindServiceBase<
            Category,
            CategoryFindFilteredQueryContract.Request,
            CategoryFindManyArgs,
            CategoryFindOneUuidQueryContract.Request,
            ICategoryFindOneUuid,
            CategoryFindOneTitleQueryContract.Request,
            ICategoryFindOneTitle
        >
{
    protected constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly configService: ConfigService,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async findFilteredBase(
        props: CategoryFindFilteredQueryContract.Request,
    ): Promise<Category[]> {
        const findFilteredInput: CategoryFindManyArgs =
            this.findFilteredQueryBase(props);
        return await this.categoryRepository.findFiltered(findFilteredInput);
    }

    public async findOneUuidBase(
        props: CategoryFindOneUuidQueryContract.Request,
    ): Promise<Category> {
        const findOneUuidInput: ICategoryFindOneUuid =
            this.findOneUuidQueryBase(props);
        const existed = await this.categoryRepository.findOneUuid(
            findOneUuidInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findOneTitleBase(
        props: CategoryFindOneTitleQueryContract.Request,
    ): Promise<Category> {
        const findOneTitleInput: ICategoryFindOneTitle =
            this.findOneTitleQueryBase(props);
        const existed = await this.categoryRepository.findOneTitle(
            findOneTitleInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public findFilteredQueryBase(
        props: CategoryFindFilteredQueryContract.Request,
    ): CategoryFindManyArgs {
        return {
            where: this.or(props.searchString),
            take: this.take(props.take),
            skip: this.skip(props.skip),
            orderBy: this.orderBy(props.orderBy),
        };
    }
    public findOneUuidQueryBase(
        props: CategoryFindOneUuidQueryContract.Request,
    ): ICategoryFindOneUuid {
        return {
            uuid: props.uuid,
        };
    }
    public findOneTitleQueryBase(
        props: CategoryFindOneTitleQueryContract.Request,
    ): ICategoryFindOneTitle {
        return {
            title: props.title,
        };
    }

    public or(searchString?: string): CategoryWhereInput {
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

    public orderBy(orderBy?: OrderBy): CategoryOrderByWithRelationInput {
        return {
            title: orderBy || this.configService.get('ORDER_BY_DEFAULT'),
        };
    }
}
