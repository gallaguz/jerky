import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { IngredientCoefficientFindManyArgsDto } from '../../../../ingredient-coefficient';
import { IngredientCountOutputTypeArgsDto } from '../count';

export class IngredientIncludeDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    ingredientCoefficient?: boolean | IngredientCoefficientFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCountOutputTypeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    _count?: boolean | IngredientCountOutputTypeArgsDto;
}
