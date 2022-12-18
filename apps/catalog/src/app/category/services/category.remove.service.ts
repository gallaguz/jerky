import { Category } from '@prisma/client/scripts/catalog-client';
import { Injectable } from '@nestjs/common';
import { IRemoveService } from '../../common';
import { CategoryRepository } from '../category.repository';
import { RMQService } from 'nestjs-rmq';
import { CategoryRemoveCommandContract } from '@jerky/contracts';
import { CategoryRemoveServiceBase } from './category.remove.service.base';

@Injectable()
export class CategoryRemoveService
    extends CategoryRemoveServiceBase
    implements IRemoveService<CategoryRemoveCommandContract.Request, Category>
{
    constructor(
        categoryRepository: CategoryRepository,
        rmqService: RMQService,
    ) {
        super(categoryRepository, rmqService);
    }

    public async remove(
        props: CategoryRemoveCommandContract.Request,
    ): Promise<Category> {
        return await this.removeBase(props);
    }
}
