import { BaseService, IUpdateServiceBase } from '../../common';
import { CategoryUpdateCommandContract } from '@jerky/contracts';
import { Category, Prisma } from '@prisma/client/scripts/catalog-client';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CategoryEntity } from '../category.entity';
import { CategoryRepository } from '../category.repository';
import { RMQService } from 'nestjs-rmq';
import CategoryUpdateInput = Prisma.CategoryUpdateInput;
import CategoryWhereUniqueInput = Prisma.CategoryWhereUniqueInput;
import { ICategoryFindOneUuid } from '@jerky/interfaces';

@Injectable()
export abstract class CategoryUpdateServiceBase
    extends BaseService
    implements
        IUpdateServiceBase<
            CategoryUpdateCommandContract.Request,
            Category,
            CategoryEntity,
            CategoryUpdateInput,
            string
        >
{
    protected constructor(
        private readonly categoryRepository: CategoryRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async updateBase(
        props: CategoryUpdateCommandContract.Request,
    ): Promise<Category> {
        const existed: Category | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const entity: CategoryEntity = this.createEntityBase(props);
        entity.update(props);

        const updateInput: CategoryUpdateInput = this.updateQueryBase(entity);
        const updated: Category = await this.categoryRepository.update(
            entity.uuid,
            updateInput,
        );
        if (!updated) throw new BadRequestException();

        await this.emitUpdateEventBase(entity, existed, updated);

        return updated;
    }

    public updateQueryBase(entity: CategoryEntity): CategoryUpdateInput {
        return {
            title: entity.title,
            description: entity.description,
        };
    }

    public createEntityBase(
        props: CategoryUpdateCommandContract.Request,
    ): CategoryEntity {
        return new CategoryEntity(props);
    }

    public async isExistBase(uuid: string): Promise<Category | null> {
        const findOneUuidInput: ICategoryFindOneUuid = { uuid };
        return await this.categoryRepository.findOneUuid(findOneUuidInput);
    }

    public async emitUpdateEventBase(
        entity: CategoryEntity,
        existed: Category,
        updated: Category,
    ): Promise<void> {
        entity.updateEvent(existed, updated);
        await this.handle(entity);
    }
}
