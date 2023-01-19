import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseCatalogWhereInputDto } from '../../../../../../common';
import { ProductListRelationFilterDto } from '../../../../product';
import { RecipeListRelationFilterDto } from '../../../../recipe';

export class RawTypeWhereInputDto extends BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawTypeWhereInputDto)
    AND?: RawTypeWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawTypeWhereInputDto)
    OR?: RawTypeWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawTypeWhereInputDto)
    NOT?: RawTypeWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductListRelationFilterDto)
    product?: ProductListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeListRelationFilterDto)
    recipe?: RecipeListRelationFilterDto;
}
