import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './category.entity';
import {
    CategoryCreate,
    CategoryRemove,
    CategoryFindFiltered,
    CategoryFindOne,
    CategoryUpdate,
} from '@jerky/contracts';
import { Category } from '@prisma/client/scripts/catalog-client';
import { BaseService, IBaseService } from '../common/base.service';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class CategoryService
    extends BaseService
    implements IBaseService<CategoryEntity>
{
    constructor(
        private readonly categoryRepository: CategoryRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async create(
        props: CategoryCreate.Request,
    ): Promise<CategoryEntity> {
        const existed = await this.categoryRepository.findFiltered({
            searchString: props.title,
        });
        if (existed) throw new ConflictException();

        const entity = new CategoryEntity(undefined, props);

        const created = await this.categoryRepository.create(entity);
        if (!created) throw new BadRequestException();

        entity.createEvent(props);
        await this.handle(entity);

        const { uuid, ...rest } = created;
        return new CategoryEntity(uuid, rest);
    }

    public async findFiltered(
        props: CategoryFindFiltered.Request,
    ): Promise<CategoryEntity[]> {
        const existed: Category[] = await this.categoryRepository.findFiltered(
            props,
        );

        return existed.map(
            ({ uuid, ...rest }) => new CategoryEntity(uuid, rest),
        );
    }

    public async findOne(
        props: CategoryFindOne.Request,
    ): Promise<CategoryEntity> {
        const existed = await this.categoryRepository.findOne(props.uuid);
        if (!existed) throw new NotFoundException();
        const { uuid, ...rest } = existed;
        return new CategoryEntity(uuid, rest);
    }

    public async update(
        props: CategoryUpdate.Request,
    ): Promise<CategoryEntity> {
        const existed = await this.categoryRepository.findOne(props.uuid);
        if (!existed) throw new NotFoundException();

        const entity = new CategoryEntity(existed.uuid);
        entity.update(props);

        const { uuid, ...rest } = await this.categoryRepository.update(entity);

        entity.updateEvent(props);
        await this.handle(entity);

        return new CategoryEntity(uuid, rest);
    }

    public async remove(
        props: CategoryRemove.Request,
    ): Promise<CategoryEntity> {
        const deleted = await this.categoryRepository.remove(props.uuid);
        if (!deleted) throw new NotFoundException();
        const { uuid, ...rest } = deleted;
        const entity = new CategoryEntity(uuid, rest);

        entity.removeEvent();
        await this.handle(entity);

        return entity;
    }
}
