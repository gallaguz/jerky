import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { Category, Prisma } from '@prisma/client/scripts/catalog-client';
import { CategoryEntity } from '../category.entity';
import { BaseService, ICreateServiceBase } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { CategoryCreateCommandContract } from '@jerky/contracts';
import CategoryCreateInput = Prisma.CategoryCreateInput;
import { ICategoryCreate, ICategoryFindOneTitle } from '@jerky/interfaces';

@Injectable()
export abstract class CategoryCreateServiceBase
    extends BaseService
    implements
        ICreateServiceBase<
            CategoryCreateCommandContract.Request,
            Category,
            CategoryEntity,
            CategoryCreateInput,
            string
        >
{
    protected constructor(
        private readonly categoryRepository: CategoryRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async createBase(
        props: CategoryCreateCommandContract.Request,
    ): Promise<Category> {
        const existed: Category | null = await this.isExistBase(props.title);
        if (existed) throw new ConflictException();

        const entity: CategoryEntity = this.createEntityBase(props);

        const createInput: CategoryCreateInput = this.createQueryBase(entity);

        const created = await this.categoryRepository.create(createInput);
        if (!created) throw new BadRequestException();

        await this.emitCreateEventBase(entity, created);

        return created;
    }

    public createQueryBase(entity: CategoryEntity): CategoryCreateInput {
        return {
            uuid: entity.uuid,
            title: entity.title,
            description: entity.description,
        };
    }

    public createEntityBase(
        props: CategoryCreateCommandContract.Request,
    ): CategoryEntity {
        const entityProps: ICategoryCreate = {
            uuid: this.uuid(),
            title: props.title,
            description: props.description,
        };
        return new CategoryEntity(entityProps);
    }

    public async isExistBase(title: string): Promise<Category | null> {
        const findOneTitleInput: ICategoryFindOneTitle = { title };
        return await this.categoryRepository.findOneTitle(findOneTitleInput);
    }

    public async emitCreateEventBase(
        entity: CategoryEntity,
        created: Category,
    ): Promise<void> {
        entity.createEvent(created);
        await this.handle(entity);
    }
}
