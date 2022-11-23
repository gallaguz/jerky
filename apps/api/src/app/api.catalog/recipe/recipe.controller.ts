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
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    // @UsePipes(new ValidationPipe())
    // @Post()
    // public async create(@Body() dto) {
    //     return this.recipeService.create(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Post('find')
    // public async findFiltered(@Body() dto) {
    //     return this.recipeService.findFiltered(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Get(':uuid')
    // public async findOne(@Param() dto) {
    //     return this.recipeService.findOne(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Patch()
    // public async update(@Body() dto) {
    //     return this.recipeService.update(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Delete(':uuid')
    // public async remove(@Param() dto) {
    //     return this.recipeService.remove(dto);
    // }
}
