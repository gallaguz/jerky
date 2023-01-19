import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

import { IngredientCreateNestedOneWithoutIngredientCoefficientInputDto } from '../../ingredient';

export class IngredientCoefficientCreateWithoutRecipeInputDto {
    @Max(100)
    @Min(1)
    @IsNumber()
    coefficient: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCreateNestedOneWithoutIngredientCoefficientInputDto)
    ingredient?: IngredientCreateNestedOneWithoutIngredientCoefficientInputDto;
}
