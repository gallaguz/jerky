import { Controller, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
    CategoryCreate,
    CategoryRemove,
    CategoryFindFiltered,
    CategoryFindOne,
    CategoryUpdate,
} from '@jerky/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @RMQValidate()
    @RMQRoute(CategoryCreate.topic)
    public async create(
        @Body() props: CategoryCreate.Request,
    ): Promise<CategoryCreate.Response> {
        return await this.categoryService.create(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryFindFiltered.topic)
    public async findFiltered(
        @Body() props: CategoryFindFiltered.Request,
    ): Promise<CategoryFindFiltered.Response> {
        return await this.categoryService.findFiltered(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryFindOne.topic)
    public async findOne(
        @Param() props: CategoryFindOne.Request,
    ): Promise<CategoryFindOne.Response> {
        return await this.categoryService.findOne(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryUpdate.topic)
    public async update(
        @Body() props: CategoryUpdate.Request,
    ): Promise<CategoryUpdate.Response> {
        return await this.categoryService.update(props);
    }

    @RMQValidate()
    @RMQRoute(CategoryRemove.topic)
    public async remove(
        @Body() props: CategoryRemove.Request,
    ): Promise<CategoryRemove.Response> {
        return await this.categoryService.remove(props);
    }
}
