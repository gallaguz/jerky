import { Controller, Body, Param, BadRequestException } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import {
    CategoryCreateCommandContract,
    CategoryRemoveCommandContract,
    CategoryFindFilteredQueryContract,
    CategoryFindOneUuidQueryContract,
    CategoryUpdateCommandContract,
} from '@jerky/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CategoryFindOneTitleQueryContract } from '@jerky/contracts';
import { IController } from '../common';
import { Category } from '@prisma/client/scripts/catalog-client';

@Controller()
export class CategoryController implements IController<Category> {
    constructor(private readonly categoryService: CategoryService) {}

    @RMQValidate()
    @RMQRoute(CategoryCreateCommandContract.topic)
    public async create(
        @Body() props: CategoryCreateCommandContract.Request,
    ): Promise<CategoryCreateCommandContract.Response> {
        return await this.categoryService.create(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryFindFilteredQueryContract.topic)
    public async findFiltered(
        @Body() props: CategoryFindFilteredQueryContract.Request,
    ): Promise<CategoryFindFilteredQueryContract.Response> {
        return await this.categoryService.findFiltered(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryFindOneUuidQueryContract.topic)
    public async findOneUuid(
        @Param() props: CategoryFindOneUuidQueryContract.Request,
    ): Promise<CategoryFindOneUuidQueryContract.Response> {
        return await this.categoryService.findOneUuid(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryFindOneTitleQueryContract.topic)
    public async findOneTitle(
        @Param() props: CategoryFindOneTitleQueryContract.Request,
    ): Promise<CategoryFindOneTitleQueryContract.Response> {
        if (!props.title) throw new BadRequestException();
        return await this.categoryService.findOneTitle(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryUpdateCommandContract.topic)
    public async update(
        @Body() props: CategoryUpdateCommandContract.Request,
    ): Promise<CategoryUpdateCommandContract.Response> {
        return await this.categoryService.update(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryRemoveCommandContract.topic)
    public async remove(
        @Body() props: CategoryRemoveCommandContract.Request,
    ): Promise<CategoryRemoveCommandContract.Response> {
        return await this.categoryService.remove(props);
    }
}
