import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ProductFindFiltered,
    ProductFindOneTitle,
    ProductFindOneUuid,
} from '@jerky/contracts';
import { ProductRepository } from '../product.repository';
import { RMQService } from 'nestjs-rmq';
import { IFindService } from '../../common';
import { Product } from '@prisma/client/scripts/catalog-client';
import { ProductFindServiceBase } from './product.find.service.base';

@Injectable()
export class ProductFindService
    extends ProductFindServiceBase
    implements
        IFindService<
            Product,
            ProductFindFiltered.Request,
            ProductFindOneUuid.Request,
            ProductFindOneTitle.Request
        >
{
    constructor(
        productRepository: ProductRepository,
        rmqService: RMQService,
        configService: ConfigService,
    ) {
        super(productRepository, configService, rmqService);
    }

    public async findFiltered(
        props: ProductFindFiltered.Request,
    ): Promise<Product[]> {
        return await this.findFilteredBase(props);
    }

    public async findOneUuid(
        props: ProductFindOneUuid.Request,
    ): Promise<Product> {
        return await this.findOneUuidBase(props);
    }

    public async findOneTitle(
        props: ProductFindOneTitle.Request,
    ): Promise<Product> {
        return await this.findOneTitleBase(props);
    }
}
