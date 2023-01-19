import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsOptional,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

import { CategoryFindManyArgsDto } from '../../../../category';
import { IngredientCoefficientFindManyArgsDto } from '../../../../ingredient-coefficient';
import { ProductFindManyArgsDto } from '../../../../product';
import { RawFindManyArgsDto } from '../../../../raw';
import { RawTypeFindManyArgsDto } from '../../../../raw-type';
import { RecipeTypeFindManyArgsDto } from '../../../../recipe-type';

export class RecipeIncludeDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    ingredientCoefficient?: boolean | IngredientCoefficientFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    product?: boolean | ProductFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    category?: boolean | CategoryFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    raw?: boolean | RawFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    rawType?: boolean | RawTypeFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipeType?: boolean | RecipeTypeFindManyArgsDto;

    @IsOptional()
    @IsBoolean()
    _count?: boolean;
}
