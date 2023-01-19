import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

import { IngredientCreateNestedOneWithoutIngredientCoefficientInputDto } from '../../ingredient';
import { RecipeCreateNestedOneWithoutIngredientCoefficientInputDto } from '../../recipe';

export class IngredientCoefficientCreateInputDto {
    @Max(100)
    @Min(1)
    @IsNumber()
    coefficient: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeCreateNestedOneWithoutIngredientCoefficientInputDto)
    recipe?: RecipeCreateNestedOneWithoutIngredientCoefficientInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCreateNestedOneWithoutIngredientCoefficientInputDto)
    ingredient?: IngredientCreateNestedOneWithoutIngredientCoefficientInputDto;
}
