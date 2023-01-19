import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsOptional,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

import { BaseCatalogSelectDto } from '../../../../../../common';
import { IngredientCoefficientFindManyArgsDto } from '../../../../ingredient-coefficient';
import { IngredientCountOutputTypeArgsDto } from '../count';

export class IngredientSelectDto extends BaseCatalogSelectDto {
    @IsOptional()
    @IsBoolean()
    type?: boolean;

    @IsOptional()
    @IsBoolean()
    price?: boolean;

    @IsOptional()
    @IsBoolean()
    payload?: boolean;

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
