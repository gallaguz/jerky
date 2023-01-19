import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientCoefficientWhereUniqueInputDto } from '../other/where/ingredient-coefficient-where-unique-input-dto';
import { IngredientCoefficientUpdateWithoutRecipeInputDto } from './ingredient-coefficient-update-without-recipe-input-dto';

export class IngredientCoefficientUpdateWithWhereUniqueWithoutRecipeInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    where: IngredientCoefficientWhereUniqueInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientUpdateWithoutRecipeInputDto)
    data: IngredientCoefficientUpdateWithoutRecipeInputDto;
}
