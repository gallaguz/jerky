import { Injectable } from '@nestjs/common';
import {
    CategoryCreateCommandContract,
    CategoryRemoveCommandContract,
    CategoryFindFilteredQueryContract,
    CategoryFindOneUuidQueryContract,
    CategoryUpdateCommandContract,
    CategoryFindOneTitleQueryContract,
} from '@jerky/contracts';
import { Category } from '@prisma/client/scripts/catalog-client';
import { CategoryCreateService } from './category.create.service';
import { CategoryUpdateService } from './category.update.service';
import { CategoryRemoveService } from './category.remove.service';
import { CategoryFindService } from './category.find.service';
import { IBaseService } from '../../common';

@Injectable()
export class CategoryService
    implements
        IBaseService<
            Category,
            CategoryCreateCommandContract.Request,
            CategoryFindFilteredQueryContract.Request,
            CategoryFindOneUuidQueryContract.Request,
            CategoryFindOneTitleQueryContract.Request,
            CategoryUpdateCommandContract.Request,
            CategoryRemoveCommandContract.Request,
            unknown
        >
{
    constructor(
        private readonly categoryCreateService: CategoryCreateService,
        private readonly categoryUpdateService: CategoryUpdateService,
        private readonly categoryRemoveService: CategoryRemoveService,
        private readonly categoryFindService: CategoryFindService,
    ) {}

    public async create(
        props: CategoryCreateCommandContract.Request,
    ): Promise<Category> {
        return await this.categoryCreateService.create(props);
    }

    public async findFiltered(
        props: CategoryFindFilteredQueryContract.Request,
    ): Promise<Category[]> {
        return await this.categoryFindService.findFiltered(props);
    }

    public async findOneUuid(
        props: CategoryFindOneUuidQueryContract.Request,
    ): Promise<Category> {
        return await this.categoryFindService.findOneUuid(props);
    }

    public async findOneTitle(
        props: CategoryFindOneTitleQueryContract.Request,
    ): Promise<Category> {
        return await this.categoryFindService.findOneTitle(props);
    }

    public async update(
        props: CategoryUpdateCommandContract.Request,
    ): Promise<Category> {
        return await this.categoryUpdateService.update(props);
    }

    public async remove(
        props: CategoryRemoveCommandContract.Request,
    ): Promise<Category> {
        return this.categoryRemoveService.remove(props);
    }
}
