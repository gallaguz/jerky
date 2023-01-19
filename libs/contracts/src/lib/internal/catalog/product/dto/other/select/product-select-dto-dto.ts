import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsOptional,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

import { BaseCatalogSelectDto } from '../../../../../../common';
import { CategoryFindManyArgsDto } from '../../../../category';
import { RawFindManyArgsDto } from '../../../../raw';
import { RawTypeFindManyArgsDto } from '../../../../raw-type';
import { RecipeArgsDto } from '../../../../recipe';
import { RecipeTypeFindManyArgsDto } from '../../../../recipe-type';
import { ProductCountOutputTypeArgsDto } from '../count';

export class ProductSelectDto extends BaseCatalogSelectDto {
    @IsOptional()
    @IsBoolean()
    recipeUuid?: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipe?: boolean | RecipeArgsDto;

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
    @ValidateNested()
    @Type(() => ProductCountOutputTypeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    _count?: boolean | ProductCountOutputTypeArgsDto;
}
