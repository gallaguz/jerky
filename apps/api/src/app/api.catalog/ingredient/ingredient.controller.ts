import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import {
    HttpIngredientCreate,
    HttpIngredientFindFiltered,
    HttpIngredientFindOne,
    HttpIngredientRemove,
    HttpIngredientUpdate,
} from '@jerky/contracts';

@Controller('ingredient')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {}

    @UsePipes(new ValidationPipe())
    @Post()
    public async create(
        @Body() dto: HttpIngredientCreate.Request,
    ): Promise<HttpIngredientCreate.Response> {
        return this.ingredientService.create(dto);
    }

    @UsePipes(new ValidationPipe())
    @Post('find')
    public async findFiltered(
        @Body() dto: HttpIngredientFindFiltered.Request,
    ): Promise<HttpIngredientFindFiltered.Response> {
        return this.ingredientService.findFiltered(dto);
    }

    @UsePipes(new ValidationPipe())
    @Get(':uuid')
    public async findOne(
        @Param() dto: HttpIngredientFindOne.Request,
    ): Promise<HttpIngredientFindOne.Response> {
        return this.ingredientService.findOne(dto);
    }

    @UsePipes(new ValidationPipe())
    @Patch()
    public async update(
        @Body() dto: HttpIngredientUpdate.Request,
    ): Promise<HttpIngredientUpdate.Response> {
        return this.ingredientService.update(dto);
    }

    @UsePipes(new ValidationPipe())
    @Delete(':uuid')
    public async remove(
        @Param() dto: HttpIngredientRemove.Request,
    ): Promise<HttpIngredientRemove.Response> {
        return this.ingredientService.remove(dto);
    }
}
