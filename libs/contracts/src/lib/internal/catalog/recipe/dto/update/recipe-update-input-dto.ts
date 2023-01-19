import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseUpdateInputDto } from '../../../../../common';
import { CategoryUpdateManyWithoutRecipeNestedInputDto } from '../../../category';
import { IngredientCoefficientUpdateManyWithoutRecipeNestedInputDto } from '../../../ingredient-coefficient';
import { ProductUpdateManyWithoutRecipeNestedInputDto } from '../../../product';
import { RawUpdateManyWithoutRecipeNestedInputDto } from '../../../raw';
import { RawTypeUpdateManyWithoutRecipeNestedInputDto } from '../../../raw-type';
import { RecipeTypeUpdateManyWithoutRecipeNestedInputDto } from '../../../recipe-type';

export class RecipeUpdateInputDto extends BaseUpdateInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientUpdateManyWithoutRecipeNestedInputDto)
    ingredientCoefficient?: IngredientCoefficientUpdateManyWithoutRecipeNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductUpdateManyWithoutRecipeNestedInputDto)
    product?: ProductUpdateManyWithoutRecipeNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryUpdateManyWithoutRecipeNestedInputDto)
    category?: CategoryUpdateManyWithoutRecipeNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawUpdateManyWithoutRecipeNestedInputDto)
    raw?: RawUpdateManyWithoutRecipeNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeUpdateManyWithoutRecipeNestedInputDto)
    rawType?: RawTypeUpdateManyWithoutRecipeNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeUpdateManyWithoutRecipeNestedInputDto)
    recipeType?: RecipeTypeUpdateManyWithoutRecipeNestedInputDto;
}
