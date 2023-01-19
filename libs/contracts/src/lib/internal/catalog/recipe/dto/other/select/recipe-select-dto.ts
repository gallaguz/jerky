import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsOptional,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

import { BaseCatalogSelectDto } from '../../../../../../common';
import { CategoryFindManyArgsDto } from '../../../../category';
import { IngredientCoefficientFindManyArgsDto } from '../../../../ingredient-coefficient';
import { ProductFindManyArgsDto } from '../../../../product';
import { InternalRawFindManyQueryContract } from '../../../../raw';
import { InternalRawTypeFindManyQueryContract } from '../../../../raw-type';
import { InternalRecipeTypeFindManyQueryContract } from '../../../../recipe-type';

export class RecipeSelectDto extends BaseCatalogSelectDto {
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
    @Type(() => InternalRawFindManyQueryContract.Request)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    raw?: boolean | InternalRawFindManyQueryContract.Request;

    @IsOptional()
    @ValidateNested()
    @Type(() => InternalRawTypeFindManyQueryContract.Request)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    rawType?: boolean | InternalRawTypeFindManyQueryContract.Request;

    @IsOptional()
    @ValidateNested()
    @Type(() => InternalRecipeTypeFindManyQueryContract.Request)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipeType?: boolean | InternalRecipeTypeFindManyQueryContract.Request;

    @IsOptional()
    @IsBoolean()
    _count?: boolean;
}
