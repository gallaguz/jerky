import { OrderBy } from '@jerky/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client/scripts/catalog-client';
import ProductOrderByWithRelationInput = Prisma.ProductOrderByWithRelationInput;
import ProductFindManyArgs = Prisma.ProductFindManyArgs;
import ProductWhereInput = Prisma.ProductWhereInput;
import { ProductRepository } from '../product.repository';
import { RMQService } from 'nestjs-rmq';
import {
    ProductFindFiltered,
    ProductFindOneTitle,
    ProductFindOneUuid,
} from '@jerky/contracts';
import { ConfigService } from '@nestjs/config';
import { BaseService, IFindServiceBase } from '../../common';
import ProductWhereUniqueInput = Prisma.ProductWhereUniqueInput;

@Injectable()
export abstract class ProductFindServiceBase
    extends BaseService
    implements
        IFindServiceBase<
            Product,
            ProductFindFiltered.Request,
            ProductFindManyArgs,
            ProductFindOneUuid.Request,
            ProductWhereUniqueInput,
            ProductFindOneTitle.Request,
            ProductWhereInput
        >
{
    protected constructor(
        private readonly productRepository: ProductRepository,
        private readonly configService: ConfigService,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async findFilteredBase(
        props: ProductFindFiltered.Request,
    ): Promise<Product[]> {
        const findFilteredInput: ProductFindManyArgs =
            this.findFilteredQueryBase(props);
        return await this.productRepository.findFiltered(findFilteredInput);
    }

    public async findOneUuidBase(
        props: ProductFindOneUuid.Request,
    ): Promise<Product> {
        const findOneUuidInput: ProductWhereUniqueInput =
            this.findOneUuidQueryBase(props);
        const existed = await this.productRepository.findOneUuid(
            findOneUuidInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findOneTitleBase(
        props: ProductFindOneTitle.Request,
    ): Promise<Product> {
        const findOneTitleInput: ProductWhereInput =
            this.findOneTitleQueryBase(props);
        const existed = await this.productRepository.findOneTitle(
            findOneTitleInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    findFilteredQueryBase(
        props: ProductFindFiltered.Request,
    ): ProductFindManyArgs {
        return {
            where: this.or(props.searchString),
            take: this.take(props.take),
            skip: this.skip(props.skip),
            orderBy: this.orderBy(props.orderBy),
        };
    }

    findOneUuidQueryBase(
        props: ProductFindOneUuid.Request,
    ): ProductWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    findOneTitleQueryBase(
        props: ProductFindOneTitle.Request,
    ): ProductWhereInput {
        return {
            title: props.title,
        };
    }

    public or(searchString?: string): ProductWhereInput {
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

    public orderBy(orderBy?: OrderBy): ProductOrderByWithRelationInput {
        return {
            title: orderBy || this.configService.get('ORDER_BY_DEFAULT'),
        };
    }
}
