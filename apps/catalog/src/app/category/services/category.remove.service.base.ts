import { Category } from '@prisma/client/scripts/catalog-client';
import { CategoryEntity } from '../category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService, IRemoveServiceBase } from '../../common';
import { CategoryRepository } from '../category.repository';
import { RMQService } from 'nestjs-rmq';
import { CategoryRemoveCommandContract } from '@jerky/contracts';
import { ICategoryRemove } from '@jerky/interfaces';

@Injectable()
export class CategoryRemoveServiceBase
    extends BaseService
    implements
        IRemoveServiceBase<
            CategoryRemoveCommandContract.Request,
            Category,
            CategoryEntity,
            ICategoryRemove
        >
{
    constructor(
        private readonly categoryRepository: CategoryRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async removeBase(
        props: CategoryRemoveCommandContract.Request,
    ): Promise<Category> {
        const removeInput: ICategoryRemove = this.removeQueryBase(props);

        const removed = await this.categoryRepository.remove(removeInput);
        if (!removed) throw new NotFoundException();

        const entity = new CategoryEntity(removed);

        await this.emitRemoveEventBase(entity, removed);

        return removed;
    }

    public removeQueryBase(
        props: CategoryRemoveCommandContract.Request,
    ): ICategoryRemove {
        return {
            uuid: props.uuid,
        };
    }

    public async emitRemoveEventBase(
        entity: CategoryEntity,
        removed: Category,
    ): Promise<void> {
        entity.removeEvent(removed);
        await this.handle(entity);
    }
}
