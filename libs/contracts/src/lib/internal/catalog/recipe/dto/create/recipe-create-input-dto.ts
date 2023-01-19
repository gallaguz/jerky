import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseCreateInputDto } from '../../../../../common';
import { IngredientCoefficientCreateNestedManyWithoutRecipeInputDto } from '../../../ingredient-coefficient';

export class RecipeCreateInputDto extends BaseCreateInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientCreateNestedManyWithoutRecipeInputDto)
    ingredientCoefficient?: IngredientCoefficientCreateNestedManyWithoutRecipeInputDto;
}
