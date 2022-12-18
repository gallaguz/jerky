import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { Category } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { CategoryCreateCommandContract } from '@jerky/contracts';
import { CategoryCreateServiceBase } from './category.create.service.base';
import { ICreateService } from '../../common';

@Injectable()
export class CategoryCreateService
    extends CategoryCreateServiceBase
    implements ICreateService<CategoryCreateCommandContract.Request, Category>
{
    constructor(
        categoryRepository: CategoryRepository,
        rmqService: RMQService,
    ) {
        super(categoryRepository, rmqService);
    }

    public async create(
        props: CategoryCreateCommandContract.Request,
    ): Promise<Category> {
        return await this.createBase(props);
    }
}
