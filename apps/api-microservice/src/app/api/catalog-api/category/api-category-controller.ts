import {
    HttpCategoryCreate,
    HttpCategoryFindFiltered,
    HttpCategoryFindOne,
    HttpCategoryRemove,
    HttpCategoryUpdate,
} from '@jerky/contracts';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { ApiCategoryService } from './api-category.service';

@Controller('category')
export class ApiCategoryController {
    constructor(private readonly categoryService: ApiCategoryService) {}

    @UsePipes(new ValidationPipe())
    @Post()
    public async create(
        @Body() dto: HttpCategoryCreate.Request,
    ): Promise<HttpCategoryCreate.Response> {
        return await this.categoryService.create(dto);
    }

    @UsePipes(new ValidationPipe())
    @Post('find')
    public async findFiltered(
        @Body()
        dto: HttpCategoryFindFiltered.Request,
    ): Promise<HttpCategoryFindFiltered.Response> {
        return await this.categoryService.findMany(dto);
    }

    @UsePipes(new ValidationPipe())
    @Get(':uuid')
    public async findOneUuid(
        @Param() dto: HttpCategoryFindOne.Request,
    ): Promise<HttpCategoryFindOne.Response> {
        return this.categoryService.findOne(dto);
    }

    @UsePipes(new ValidationPipe())
    @Patch()
    public async update(
        @Body() dto: HttpCategoryUpdate.Request,
    ): Promise<HttpCategoryUpdate.Response> {
        return this.categoryService.update(dto);
    }

    @UsePipes(new ValidationPipe())
    @Delete(':uuid')
    public async remove(
        @Param() dto: HttpCategoryRemove.Request,
    ): Promise<HttpCategoryRemove.Response> {
        return this.categoryService.remove(dto);
    }

    @Get('test/test')
    public async test(): Promise<string> {
        return 'working';
    }
}
