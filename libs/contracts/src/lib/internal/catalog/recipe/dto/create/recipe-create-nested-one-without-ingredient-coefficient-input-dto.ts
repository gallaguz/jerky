import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RecipeWhereUniqueInputDto } from '../other';

export class RecipeCreateNestedOneWithoutIngredientCoefficientInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereUniqueInputDto)
    connect?: RecipeWhereUniqueInputDto;
}
