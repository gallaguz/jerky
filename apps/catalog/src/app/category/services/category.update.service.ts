import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { Category } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { CategoryUpdateCommandContract } from '@jerky/contracts';
import { CategoryUpdateServiceBase } from './category.update.service.base';
import { IUpdateService } from '../../common';

@Injectable()
export class CategoryUpdateService
    extends CategoryUpdateServiceBase
    implements IUpdateService<CategoryUpdateCommandContract.Request, Category>
{
    constructor(
        categoryRepository: CategoryRepository,
        rmqService: RMQService,
    ) {
        super(categoryRepository, rmqService);
    }

    public async update(
        props: CategoryUpdateCommandContract.Request,
    ): Promise<Category> {
        return await this.updateBase(props);
    }
}
