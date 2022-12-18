import { Controller } from '@nestjs/common';
import { RecipeTypeService } from './recipe.type.service';

@Controller('recipe.type')
export class RecipeTypeController {
    constructor(private readonly recipeTypeService: RecipeTypeService) {}

    // @UsePipes(new ValidationPipe())
    // @Post()
    // public async create(@Body() dto) {
    //     return this.recipeTypeService.create(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Post('find')
    // public async findFiltered(@Body() dto) {
    //     return this.recipeTypeService.findFiltered(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Get(':uuid')
    // public async findOne(@Param() dto) {
    //     return this.recipeTypeService.findOne(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Patch()
    // public async update(@Body() dto) {
    //     return this.recipeTypeService.update(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Delete(':uuid')
    // public async remove(@Param() dto) {
    //     return this.recipeTypeService.remove(dto);
    // }
}
