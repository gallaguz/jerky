import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
    HttpCategoryCreate,
    HttpCategoryFindFiltered,
    HttpCategoryFindOne,
    HttpCategoryRemove,
    HttpCategoryUpdate,
} from '@jerky/contracts';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

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
        return await this.categoryService.findFiltered(dto);
    }

    @UsePipes(new ValidationPipe())
    @Get(':uuid')
    public async findOne(
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
}
