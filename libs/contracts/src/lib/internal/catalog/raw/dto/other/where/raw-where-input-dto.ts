import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import {
    BaseCatalogWhereInputDto,
    FloatFilterDto,
} from '../../../../../../common';
import { ProductListRelationFilterDto } from '../../../../product';
import { RecipeListRelationFilterDto } from '../../../../recipe';

export class RawWhereInputDto extends BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawWhereInputDto)
    AND?: RawWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawWhereInputDto)
    OR?: RawWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawWhereInputDto)
    NOT?: RawWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => FloatFilterDto)
    price?: FloatFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => FloatFilterDto)
    payload?: FloatFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductListRelationFilterDto)
    product?: ProductListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeListRelationFilterDto)
    recipe?: RecipeListRelationFilterDto;
}
