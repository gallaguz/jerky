import {
    CategoryFindFilteredQueryContract,
    CategoryFindOneTitleQueryContract,
    CategoryFindOneUuidQueryContract,
} from '@jerky/contracts';
import { Category } from '@prisma/client/scripts/catalog-client';
import { IFindService } from '../../common';
import { CategoryRepository } from '../category.repository';
import { RMQService } from 'nestjs-rmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CategoryFindServiceBase } from './category.find.service.base';

@Injectable()
export class CategoryFindService
    extends CategoryFindServiceBase
    implements
        IFindService<
            Category,
            CategoryFindFilteredQueryContract.Request,
            CategoryFindOneUuidQueryContract.Request,
            CategoryFindOneTitleQueryContract.Request
        >
{
    constructor(
        categoryRepository: CategoryRepository,
        rmqService: RMQService,
        configService: ConfigService,
    ) {
        super(categoryRepository, configService, rmqService);
    }

    public async findFiltered(
        props: CategoryFindFilteredQueryContract.Request,
    ): Promise<Category[]> {
        return await this.findFilteredBase(props);
    }

    public async findOneTitle(
        props: CategoryFindOneTitleQueryContract.Request,
    ): Promise<Category> {
        return await this.findOneTitleBase(props);
    }

    public async findOneUuid(
        props: CategoryFindOneUuidQueryContract.Request,
    ): Promise<Category> {
        return await this.findOneUuidBase(props);
    }
}
