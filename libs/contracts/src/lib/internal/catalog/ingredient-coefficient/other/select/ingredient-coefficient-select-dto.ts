import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsOptional,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

import { IngredientArgsDto } from '../../../ingredient';
import { RecipeArgsDto } from '../../../recipe';

export class IngredientCoefficientSelectDto {
    @IsOptional()
    @IsBoolean()
    uuid?: boolean;

    @IsOptional()
    @IsBoolean()
    createdAt?: boolean;

    @IsOptional()
    @IsBoolean()
    updatedAt?: boolean;

    @IsOptional()
    @IsBoolean()
    coefficient?: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipe?: boolean;

    @IsOptional()
    @IsBoolean()
    recipeUuid?: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    ingredient?: boolean | IngredientArgsDto;

    @IsOptional()
    @IsBoolean()
    ingredientUuid?: boolean;
}
